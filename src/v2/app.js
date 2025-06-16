const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// In-memory storage for guestbook entries
let entries = [];

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up enhanced HTML with improved styles
app.get('/', (req, res) => {
  let entriesHtml = entries.map(entry => 
    `<div class="entry">
      <div class="entry-header">
        <span class="entry-name">${entry.name}</span>
        <span class="entry-date">${entry.date}</span>
      </div>
      <div class="entry-message">${entry.message}</div>
    </div>`
  ).join('');

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Guestbook App - v2</title>
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
      h1 { color: #2c3e50; text-align: center; }
      form { margin-bottom: 30px; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
      input, textarea { width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ddd; border-radius: 4px; }
      button { padding: 10px 20px; background-color: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer; transition: background-color 0.3s; }
      button:hover { background-color: #2980b9; }
      .version { position: absolute; top: 10px; right: 10px; background-color: #e74c3c; color: white; padding: 5px 10px; border-radius: 4px; font-weight: bold; }
      .entry { margin-bottom: 15px; padding: 15px; background-color: #fff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
      .entry-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
      .entry-name { font-weight: bold; color: #2c3e50; }
      .entry-date { color: #7f8c8d; font-size: 0.9em; }
      .entry-message { color: #34495e; }
      .no-entries { text-align: center; color: #7f8c8d; }
    </style>
  </head>
  <body>
    <div class="version">v2</div>
    <h1>Guestbook App</h1>
    <form action="/sign" method="post">
      <h2>Sign the Guestbook</h2>
      <div>
        <input type="text" name="name" placeholder="Your Name" required>
      </div>
      <div>
        <textarea name="message" placeholder="Your Message" rows="4" required></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
    
    <h2>Recent Entries</h2>
    ${entriesHtml || '<p class="no-entries">No entries yet. Be the first to sign!</p>'}
  </body>
  </html>
  `;
  
  res.send(html);
});

// API endpoint to add a new entry
app.post('/sign', (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).send('Name and message are required');
  }
  
  const newEntry = {
    name,
    message,
    date: new Date().toLocaleString()
  };
  
  entries.unshift(newEntry); // Add to the beginning of the array
  res.redirect('/');
});

// API endpoint to get all entries in JSON format
app.get('/api/entries', (req, res) => {
  res.json(entries);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Ready check endpoint (new in v2)
app.get('/ready', (req, res) => {
  res.status(200).send('Ready');
});

// Start the server
app.listen(port, () => {
  console.log(`Guestbook App v2 listening at http://localhost:${port}`);
});