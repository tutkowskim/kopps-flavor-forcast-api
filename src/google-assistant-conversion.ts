import { conversation, Image } from '@assistant/conversation';
import { koppsFlavorForecast } from './kopps-flavor-preview-web-scrapper';

const flavorOfTheDayConversion = conversation()

flavorOfTheDayConversion.handle('Flavor of the day', conv => {
  koppsFlavorForecast().then(flavorForecast => {
    if (flavorForecast.length > 0 && flavorForecast[0].flavors.length > 0) {
      const todaysFlavorForecast = flavorForecast[0];

      // Send the flavor names to the conversion
      const flavorNames: string[] = todaysFlavorForecast.flavors.map((flavorObj) => flavorObj.flavor);
      const formatedFlavorString: string = flavorNames.length > 1 ? `${flavorNames.slice(0, -1).join(',')} and ${flavorNames.slice(-1)}` : flavorNames[0];
      conv.add(`The flavor of the day at Kopps on ${todaysFlavorForecast.date} is ${formatedFlavorString}.`);
      
      // Send the flavor images to the conversion
      todaysFlavorForecast.flavors.forEach((flavor) => {
        conv.add({ 
          image: new Image({
            url: flavor.image,
            alt: flavor.flavor,
          }),
        });
      });
    } else {
      conv.add("Sorry, We we're unable to find any flavors of the day.");
    }
  }).catch(() => {
    conv.add("Sorry, We're unable to fetch the flavor of the day at this time.");
  });
});

export default flavorOfTheDayConversion;
