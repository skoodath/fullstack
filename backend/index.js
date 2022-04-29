const express = require("express");
const cors = require("cors");
let notes = require("./notes");

const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (request, response) => {
  response.send("<h1>Notes App Backend</h1>");
});

const getAllNotes = (request, response) => {
  response.json(notes);
};

app.get("/api/notes", getAllNotes);

const getSingleNote = (request, response) => {
  const id = parseInt(request.params.id);
  const note = notes.find((note) => note.id === id);
  note ? response.json(note) : response.status(404).end();
};

app.get("/api/notes/:id", getSingleNote);

const generateID = () => {
  const maxID = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxID + 1;
};

const newNote = (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "Content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date().toISOString(),
    id: generateID(),
  };

  notes = notes.concat(note);

  response.json(note);
};
app.post("/api/notes", newNote);

app.delete("/api/notes/:id", (request, response) => {
  const id = parseInt(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
