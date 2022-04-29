import { useEffect, useState } from "react";
import "./App.scss";
import Note from "./components/Notes";
import AddNotes from "./components/AddNotes";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Button from "react-bootstrap/Button";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [error, setError] = useState("");

  const errorCapture = (err) => {
    setError(err.message);
    setTimeout(() => setError(""), 5000);
  };

  useEffect(() => {
    noteService
      .getNotes()
      .then((initialNotes) => {
        setNotes(initialNotes);
      })
      .catch((error) => {
        errorCapture(error);
      });
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObj = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };
    noteService
      .createNote(noteObj)
      .then((addedNote) => setNotes(notes.concat(addedNote)));
    setNewNote("");
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changeNote = { ...note, important: !note.important };
    noteService
      .updateNote(id, changeNote)
      .then((updatedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : updatedNote)));
      })
      .catch((error) => {
        errorCapture(error);
      });
    setNotes(notes.filter((note) => note.id !== id));
  };
  const removeThisNote = (id) => {
    noteService.deleteNote(id).then(() => {
      setNotes(notes.filter((note) => note.id !== id));
    });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div className='App p-2 container'>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <span className='navbar-brand'>Notes</span>
      </nav>
      {error && <Notification message={error} />}
      <AddNotes
        addNote={addNote}
        value={newNote}
        handleChange={handleNoteChange}
      />
      {!error && (
        <div>
          <Button onClick={() => setShowAll(!showAll)} variant='danger'>
            {" "}
            Show {showAll ? "Important" : "All"}
          </Button>
        </div>
      )}
      <ul className='list-group-flush'>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            removeNote={() => removeThisNote(note.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
