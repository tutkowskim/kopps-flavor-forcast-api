import express from 'express';
import { koppsFlavorForecast } from './kopps-flavor-preview-web-scrapper';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (_req, res) => {
  res.json(await koppsFlavorForecast())
});
 
app.listen(PORT);