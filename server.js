const express = require(`express`)
const path = require(`path`)
const database = require('./db/db');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });


 app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);


app.post('/notes', (req, res) => {
  
res.json(`${req.method} request received to upvote`);

const { title, text} = req.body;


  if (title && text) {
    const newNote = {
      title,
      text,
    };
    
    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
} else {

  res.json('Error in making new note');
}




 
});

app.listen(PORT, () =>
console.log(`Example app listening at http://localhost:${PORT}`))