const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

let items = [];

// GET route to fetch all items
app.get('/items', (req, res) => {
  res.json(items);
});

// POST route to add a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  
  if (!newItem.name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT route to update an item
app.put('/items/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedItem = req.body;
    
    if (!updatedItem.name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    
    if (id >= 0 && id < items.length) {
      items[id] = updatedItem;
      res.json(updatedItem);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Invalid request format' });
  }
});

// DELETE route to delete an item
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  
  if (id >= 0 && id < items.length) {
    items.splice(id, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
