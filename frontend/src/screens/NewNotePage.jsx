import { Container, Form, Button } from "react-bootstrap";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addNote, useSaveNoteMutation } from "../slices/noteSlice";

const NewNotePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id || "";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const [saveNote] = useSaveNoteMutation({ userId, note });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("note", note, userId);
      const newNote = {
        userId: userId,
        title: note.title,
        description: note.description,
        content: note.content,
      };
      await saveNote(newNote).unwrap();
    } catch (error) {
      console.log(error);
    }
    dispatch(addNote(note));
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="noteTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="noteDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            name="description"
            value={description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="noteText">
          <Form.Label>Note</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter your note"
            name="content"
            value={content}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Save Note
        </Button>
      </Form>
    </Container>
  );
};

export default NewNotePage;
