/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import cors from 'cors';
import express from 'express';
import { cities } from './cities';

const app = express();

app.use(express.json());

app.options('/q', cors()); // enable pre-flight request for DELETE request
app.post('/q', cors(), (req, res) => {
  const q = req.body?.q;
  const qNormal = typeof q === 'string' ? q.toLocaleLowerCase() : '';
  
  const result = cities.filter((c) => typeof c.cityLabel === 'string' && c.cityLabel.toLocaleLowerCase().includes(qNormal))

  res.json(result);
});

app.get('/', (req, res) => {
  res.send({
    message:
      'Welcome to tinyServer! See use /q for search or /autocomplete for autocomplete',
  });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
