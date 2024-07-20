// index.js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let items = [];

// GET route to fetch all items
app.get('/items', (req, res) => {
  res.json(items);
});

// POST route to add a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
