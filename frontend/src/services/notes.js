import axios from "axios";
const baseURL = "/api/notes";

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

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
