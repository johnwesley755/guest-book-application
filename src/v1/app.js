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

// Set up basic HTML with inline styles
app.get('/', (req, res) => {
  let entriesHtml = entries.map(entry => 
    `<div style="margin-bottom: 10px; padding: 10px; border: 1px solid #ccc;">
      <strong>${entry.name}</strong> (${entry.date})<br>
      ${entry.message}
    </div>`
  ).join('');

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Guestbook App - v1</title>
    <style>
      body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
      h1 { color: #333; }
      form { margin-bottom: 20px; padding: 15px; background-color: #f5f5f5; }
      input, textarea { width: 100%; padding: 8px; margin-bottom: 10px; }
      button { padding: 8px 16px; background-color: #4CAF50; color: white; border: none; cursor: pointer; }
      .version { position: absolute; top: 10px; right: 10px; background-color: #333; color: white; padding: 5px 10px; }
    </style>
  </head>
  <body>
    <div class="version">v1</div>
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
    
    <h2>Entries</h2>
    ${entriesHtml || '<p>No entries yet. Be the first to sign!</p>'}
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

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Start the server
app.listen(port, () => {
  console.log(`Guestbook App v1 listening at http://localhost:${port}`);
});