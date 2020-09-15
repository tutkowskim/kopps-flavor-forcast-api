import got from 'got';
import cheerio from 'cheerio';

export interface FlavorForecast {
  date: string;
  flavors: Flavor[];
}

export interface Flavor {
  flavor: string;
  description: string;
  image: string;
}

export const koppsFlavorForecast = async (): Promise<FlavorForecast[]> => {
  const flavorPreviewHtml = (await got('https://www.kopps.com/flavor-preview')).body;
  const flavorCardsHtmlElements = getFlavorCardsHTML(flavorPreviewHtml);
  return flavorCardsHtmlElements.map((flavorCardsHtmlElement: string) => getFlavorForecastFromHTML(flavorCardsHtmlElement));
}

const getFlavorCardsHTML = (flavorPreviewHtml: string): string[] => {
  const $ = cheerio.load(flavorPreviewHtml);
  return $('.flavor-forecast').toArray().map(forecastCard => $.html(forecastCard));
}

const getFlavorForecastFromHTML = (flavorCardHtml: string): FlavorForecast => {
  const $ = cheerio.load(flavorCardHtml);

  return {
    date: $('h5').text(),
    flavors: [
      {
        flavor: $('.grid div:nth-of-type(1) .flavor-of-day').text(),
        description: $('.grid div:nth-of-type(1) p').text(),
        image: 'https://www.kopps.com' + $('.grid div:nth-of-type(1) .flavor-circle img').prop('src'),
      },
      {
        flavor:  $('.grid div:nth-of-type(2) .flavor-of-day').text(),
        description: $('.grid div:nth-of-type(2) p').text(),
        image: 'https://www.kopps.com' + $('.grid div:nth-of-type(2) .flavor-circle img').prop('src'),
      },
    ],
  };
}
