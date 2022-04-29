import "../style/addnote.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AddNotes = ({ value, addNote, handleChange }) => (
  <Form onSubmit={addNote} className='note_form px-0 py-2'>
    <Form.Group controlId='formAddNote' className='d-flex flex-row'>
      <Form.Control
        type='text'
        value={value}
        onChange={handleChange}
        placeholder='Type note here'
        className='me-2'
      />
      <Button type='submit' variant='primary'>
        save
      </Button>
    </Form.Group>
  </Form>
);

export default AddNotes;
