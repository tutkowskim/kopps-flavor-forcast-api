import { conversation } from '@assistant/conversation';
import { koppsFlavorForecast } from './kopps-flavor-preview-web-scrapper';

const flavorOfTheDayConversion = conversation()

flavorOfTheDayConversion.handle('', async conv => {
  const flavorForecast = await koppsFlavorForecast();
  const todaysFlavorForecast = flavorForecast[0];
  if (flavorForecast.length > 0 && todaysFlavorForecast.flavors.length > 0) {
    const flavorNames: string[] = todaysFlavorForecast.flavors.map((flavorObj) => flavorObj.flavor);
    const formatedFlavorString: string = flavorNames.length > 1 ? `${flavorNames.slice(0, -1).join(',')} and ${flavorNames.slice(-1)}` : flavorNames[0];
    conv.add(`The flavor of the day at Kopps on ${todaysFlavorForecast.date} is ${formatedFlavorString}.`);
  } else {
    conv.add("Sorry, We we're unable to find any flavors of the day.");
  }
});

export default flavorOfTheDayConversion;
