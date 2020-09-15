import express from 'express';
import bodyParser from 'body-parser';
import flavorOfTheDayConversion from './google-assistant-conversion-result';
import { koppsFlavorForecast } from './kopps-flavor-preview-web-scrapper';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', async (_req, res) => {
  res.json(await koppsFlavorForecast());
});

app.post('/google-actions-fulfillment', flavorOfTheDayConversion);

app.listen(PORT);