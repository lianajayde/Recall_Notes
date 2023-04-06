//Declaring constants
const util = require('util');
const fs = require('fs');
//Unique ID
const { v4: uuidv4 } = require('uuid');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


//Function for getting notes
class storedData {
    read() {
        return readFileAsync('db/db.json', 'utf8');
    }
    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }
    
    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;

        //Array for if there are no notes listed
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        });
    }
    //Unique ID
    addNote(note) {
        const { title, text } = note;
        const newNote = { title, text, id: uuidv4() };
        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.write(updatedNotes))
            .then(() => newNote)
    }
    //Deleting a note
    deleteNote(id) {
        return this.getNotes()
            .then((notes) => notes.filter(n => n.id !== id))
            .then((updatedNotes) => this.write(updatedNotes))
    }
}



module.exports = new storedData();