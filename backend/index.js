require("dotenv").config();
const express = require("express");
const cors = require("cors");
let notes = require("./notes");
const Note = require("./models/note");
const { update } = require("./models/note");

/* Middleware */
const app = express();
app.use(cors());
app.use(express.static("build"));
app.use(express.json());

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);

/* Routes */
app.get("/", (request, response) => {
  response.send("<h1>Notes App Backend</h1>");
});

const getAllNotes = (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
};

app.get("/api/notes", getAllNotes);

/* ******** Get note by ID ******** */
const getSingleNote = (request, response) => {
  const id = request.params.id;
  Note.findById(id)
    .then((note) => {
      if (note) response.json(note);
      response.status(404).end();
    })
    .catch((error) => {
      next(error);
    });
};

app.get("/api/notes/:id", getSingleNote);

/* ********* Post request ******** */
const newNote = (request, response, next) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({
      error: "Content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date().toISOString(),
  });

  note
    .save()
    .then((note) => {
      response.json(note);
    })
    .catch((error) => {
      next(error);
    });
};
app.post("/api/notes", newNote);

/* *******Update note******* */
const updateNote = (request, response, next) => {
  const id = request.params.id;
  const { content, important } = request.body;

  Note.findByIdAndUpdate(
    id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
};

app.put("/api/notes/:id", updateNote);

/* *******Delete note******* */

app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  Note.findByIdAndDelete(id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

/* Server */

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
