import express from 'express';
import bodyParser from 'body-parser';
import flavorOfTheDayConversion from './google-assistant-conversion';
import { koppsFlavorForecast } from './kopps-flavor-preview-web-scrapper';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/google-actions-fulfillment', flavorOfTheDayConversion);

app.get('/', async (_req, res) => {
  res.json(await koppsFlavorForecast());
});

app.listen(PORT);