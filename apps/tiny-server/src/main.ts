/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import cors from 'cors';
import express from 'express';
import { autocomplete, search } from './search-autocomplete';

const app = express();

app.use(express.json());

// query
app.options('/q', cors()); // enable pre-flight request for POST request
app.post('/q', cors(), (req, res) => {
  const result = search(req.body);

  res.json(result);
});

// autocomplete
app.options('/autocomplete', cors()); // enable pre-flight request for POST request
app.post('/autocomplete', cors(), (req, res) => {
  const result = autocomplete(req.body);

  res.json(result);
});

app.get('/', (req, res) => {
  res.send({
    message:
      'Welcome to tinyServer! Use /q for search or /autocomplete for autocomplete',
  });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
