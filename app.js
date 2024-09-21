const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Use body-parser middleware to parse POST request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files like CSS
app.use(express.static('public'));

// In-memory storage for tasks
let tasks = [];

// Routes
app.get('/hi', (req, res) => {
  res.render('index', { tasks: tasks });
});

app.post('/addtask', (req, res) => {
  const newTask = req.body.task;
  if (newTask) {
    tasks.push(newTask);
  }
  res.redirect('/');
});

app.post('/removetask', (req, res) => {
  const removeTask = req.body.task;
  tasks = tasks.filter(task => task !== removeTask);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
