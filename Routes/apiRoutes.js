//Declaring constants
const router = require('express').Router();
const storedData = require('../db/storedData');

//Gets the notes
router.get('/notes', (req, res) => {
    storedData
        .getNotes()
        .then((notes) => {
        return res.json(notes);
        })
        .catch((err) => res.status(500).json(err))
});

//Posts the notes
router.post('/notes', (req, res) => {
    storedData
        .addNote(req.body)
        .then((note) => {
        res.json(note)
        })
        .catch((err) => res.status(500).json(err))
});

//Deletes notes **BONUS
router.delete('/notes/:id', (req, res) => {
    store
        .deleteNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch((err) => res.status(500).json(err))
})

module.exports = router;