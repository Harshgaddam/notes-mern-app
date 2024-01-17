import { Container, Form, Button } from "react-bootstrap";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addNote, useSaveNoteMutation } from "../slices/noteSlice";

const NewNotePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id || "";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [randomId, setRandomId] = useState(""); // State to hold randomId

  const stateNote = useSelector((state) =>
    state.notes.myNotes.find((note) => note._id === randomId)
  );

  useEffect(() => {
    setTitle(stateNote?.title || ""); // Use optional chaining to avoid errors
    setDescription(stateNote?.description || "");
    setContent(stateNote?.content || "");
    setFile(stateNote?.file || "");
  }, [stateNote]);

  const dispatch = useDispatch();

  useEffect(() => {
    const newRandomId = 1;
    setTitle("");
    setDescription("");
    setContent("");
    setFile("");
    setRandomId(newRandomId);
    dispatch(
      addNote({
        _id: randomId,
        title: title,
        description: description,
        content: content,
        file: file,
      })
    );
    console.log("Done");
  }, [title, description, content, file, dispatch, randomId]);

  const [saveNote] = useSaveNoteMutation();

  const handleChange = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "title") setTitle(value);
    if (name === "description") setDescription(value);
    if (name === "content") setContent(value);
    if (name === "file") setFile(value);
    dispatch(
      addNote({
        _id: randomId,
        title: title,
        description: description,
        content: content,
        file: file,
      })
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newNote = {
      _id: randomId,
      userId: userId,
      title: title,
      description: description,
      content: content,
      file: file,
    };
    try {
      const noteId = await saveNote(newNote).unwrap();
      newNote._id = noteId;
      setRandomId(noteId); // Update the randomId in the state after saving the note
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
