//install dependencies
const express = require("express");
const {v4:uuidv4} = require("uuid");
const fs = require("fs");
const path = require("path");




//express
const app = express();
const PORT = process.env.PORT || 3001;

//data parsing via middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));



//viewHTML code//
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
//

//writeAPIcode//
app.get("/api/notes", (req, res) => {
 res.sendFile(path.join(__dirname, '/db/db.json'))
  
});

app.post("/api/notes", (req, res) => {

  let newNote = req.body;
  let newID = uuidv4();
  newNote.id = newID;

     fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        throw err;
      } else {
        let noteArray = JSON.parse(data);
        
        noteArray.push(newNote);
      

        fs.writeFile(
          "./db/db.json",
          JSON.stringify(noteArray), err => {
            if (err) throw err;
            console.info("Successfully stringified data!");

            //res.json('added new note.');
          })
          };
     res.redirect('/notes');
        })
   
});


app.delete('api/notes/:id', (req, res) => {

  let readfileSync = fs.readFileSync(path.join(__dirname, './db/db.json'));
  let noteArrayFile = JSON.parse(readfileSync);
  let currentNoteId = req.params.id;

  let updatedNoteArray = noteArrayFile.filter(note => note.id != currentNoteId)
  
  fs.writeFileSync(path.join(__dirname, '/db/db.json'),
      JSON.stringify(updatedNoteArray)
    );

  res.sendStatus(200);
  })


//end writeAPI code//

//catchall
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Application active and listening on localhost:${PORT}.`);
});
