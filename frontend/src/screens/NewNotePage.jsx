import { Container, Form, Button } from "react-bootstrap";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  addNote,
  useSaveNoteMutation,
  useUpdateNoteMutation,
} from "../slices/noteSlice";

const NewNotePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id || "";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [noteId, setNoteId] = useState(1); // State to hold randomId

  const stateNote = useSelector((state) =>
    state.notes.myNotes.find((note) => note.noteId === noteId)
  );

  useEffect(() => {
    setTitle(stateNote?.title || "");
    setDescription(stateNote?.description || "");
    setContent(stateNote?.content || "");
    setFile(stateNote?.file || "");
  }, [stateNote]);

  const dispatch = useDispatch();

  useEffect(() => {
    setTitle("");
    setDescription("");
    setContent("");
    setFile("");
    setNoteId(noteId);
    dispatch(
      addNote({
        noteId: noteId,
        title: title,
        description: description,
        content: content,
        file: file,
      })
    );
    console.log("Done");
  }, [title, description, content, file, noteId, dispatch]);

  const [saveNote] = useSaveNoteMutation();
  const [updateNote] = useUpdateNoteMutation();

  const handleChange = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "title") setTitle(value);
    if (name === "description") setDescription(value);
    if (name === "content") setContent(value);
    if (name === "file") setFile(value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newNote = {
      noteId: noteId,
      userId: userId,
      title: title,
      description: description,
      content: content,
      file: file,
    };
    try {
      let retrievedId = noteId;
      if (noteId === 1) retrievedId = await saveNote(newNote).unwrap();
      else retrievedId = await updateNote(newNote).unwrap();
      newNote.noteId = retrievedId;
      setNoteId(retrievedId);
    } catch (error) {
      console.log(error);
    }
    dispatch(addNote(newNote));
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

        <Form.Group controlId="noteFile">
          <Form.Label>File</Form.Label>
          <Form.Control
            type="file"
            placeholder="Upload File"
            name="file"
            value={file}
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

export default NewNotePage;
