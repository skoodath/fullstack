import axios from "axios";
const baseURL = "http://localhost:3001/api/notes";

const getNotes = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const createNote = (newNote) => {
  const request = axios.post(baseURL, newNote);
  return request.then((response) => response.data);
};

const updateNote = (id, changedNote) => {
  const request = axios.put(`${baseURL}/${id}`, changedNote);
  return request.then((response) => response.data);
};

const deleteNote = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then((response) => response.data);
};

export default {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
