const router = require('express').Router();
const uuid = require('../public/assets/js/uuid');
const fs = require('fs');
const PORT = process.env.PORT || 3001;

//api processes
//first, get request for viewing notes
//next, post request for adding additional note
//finally, new note is parsed, then stringified, then we use fs.writeFile to add new note to existing db

router.get('/api/notes', (req, res) => {
    fs.readFile('.db/db.json', 'utf8', (err, data) => {
        if(err) {
            throw err;
        } else {
            res.json(JSON.parse(data))
    }
})
});

router.post('/api/notes', (req, res) => {

    const {title, text} = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid()
        };
    
        const response = {
        status: 'GET route for new note successful.',
        body: newNote,
    };

    console.log(response);

    } else {
    console.log('error in GET route for new note.')
    };

    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        } else {
            const noteArray = JSON.parse(data);
            noteArray.push(newNote);
            }
        });
    
    });

    
//delete note
//create .filter using ID of note to be deleted
//once completed, rewrite file with fs for updated note array

router.delete(`api/notes/:id`, (req, res) => {

    const currentNoteId = req.params.id;

    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        } else {

            const noteArray = JSON.parse(data);
            const updatedNoteArray = noteArray.filter((note) => {
                if (note.id !== currentNoteId) {
                    return note;
                }
            });
        fs.writeFile('./db/db.json', JSON.stringify(updatedNoteArray), (err, data) => {
            res.json(`Success. Note: ID ${currentNoteId} has been removed.`)
        })
        }
    });
})

app.listen(PORT, () => {
    console.log(`Application active and listening on localhost:${PORT}.`)
});

module.exports = router;