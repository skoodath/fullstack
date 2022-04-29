import Button from "react-bootstrap/Button";

const Note = ({ note, toggleImportance, removeNote }) => {
  const label = note.important ? "Make not important" : "Make important";

  return (
    <li className='list-group-item mx-0 my-2 w-50 d-flex flex-row align-items-center'>
      <span className='me-2 ms-0'>{note.content}</span>
      <Button onClick={toggleImportance} className='btn-primary me-2 m-auto'>
        {label}
      </Button>
      <Button onClick={removeNote} className='btn-warning'>
        Remove
      </Button>
    </li>
  );
};

export default Note;
