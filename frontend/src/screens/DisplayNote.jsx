import { Container, Form, Button } from "react-bootstrap";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { addNote, useUpdateNoteMutation } from "../slices/noteSlice";

import Message from "../components/Message";

const NotePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id || "";
  const { _id: noteId } = useParams();

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const stateNote = useSelector((state) =>
    state.notes.myNotes.find((note) => note._id === noteId)
  );

  useEffect(() => {
    setTitle(stateNote.title);
    setDescription(stateNote.description);
    setContent(stateNote.content);
  }, [stateNote]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    if (name === "description") setDescription(value);
    if (name === "content") setContent(value);
  };

  const [updateNote] = useUpdateNoteMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newNote = {
      noteId: noteId,
      userId: userId,
      title: title,
      description: description,
      content: content,
    };
    try {
      await updateNote(newNote).unwrap();
    } catch (error) {
      <Message>{error?.data?.message}</Message>;
    }
    dispatch(
      addNote({
        _id: noteId,
        title: title,
        description: description,
        content: content,
      })
    );
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

export default NotePage;
