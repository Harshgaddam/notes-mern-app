import { Container, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateNoteMutation } from "../slices/noteSlice";
import { useParams } from "react-router-dom";
import { addNote } from "../slices/noteSlice";
import { useDispatch } from "react-redux";
import { useUploadFileMutation } from "../slices/noteSlice";
import { useDeleteFileMutation } from "../slices/noteSlice";
import { toast } from "react-toastify";

const NotePage = () => {
  const { userInfo } = useSelector((state) => state.auth) || "";
  const userId = userInfo._id || "";
  const userName = userInfo.name || "";
  const { _id: noteId } = useParams();
  console.log("noteId", noteId, userId);

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");

  const stateNote = useSelector((state) =>
    state.notes.myNotes.find((note) => note.noteId === noteId)
  );

  useEffect(() => {
    setTitle(stateNote.title);
    setDescription(stateNote.description);
    setContent(stateNote.content);
    setFile(stateNote.file);
  }, [stateNote]);

  const [uploadFile] = useUploadFileMutation();

  const uploadHandler = async (e) => {
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("userName", userName);
    formData.append("file", e.target.files[0]);
    for (let pair of formData.entries()) {
      console.log(pair);
    }
    try {
      const { filePath } = await uploadFile(formData).unwrap();
      toast.success("File Uploaded");
      console.log("path", filePath);
      setFile(filePath);
      dispatch(
        addNote({
          noteId,
          title,
          description,
          content,
          file: filePath,
        })
      );
      console.log("file", file);
    } catch (error) {
      console.log(error);
    }
    console.log(title, description, content, file);
  };

  const [deleteFile] = useDeleteFileMutation();
  const deleteHandler = async () => {
    const fileName = file;
    await deleteFile(fileName).unwrap();
    const newNote = { noteId, title, description, content, file: "" };
    console.log("newNote", newNote);
    const response = await updateNote(newNote).unwrap();
    console.log("response", response);
    dispatch(addNote(newNote));
  };

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
      file: file,
    };
    try {
      await updateNote(newNote).unwrap();
    } catch (error) {
      console.log(error);
    }
    dispatch(
      addNote({
        noteId: noteId,
        title: title,
        description: description,
        content: content,
        file: file,
      })
    );
    toast.success("Note Saved");
  };

  return (
    <Container className="mt-3">
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
        {file ? (
          <Form.Group className="d-flex justify-content-between align-items-center">
            <Form.Label>
              <strong>{file}</strong>
            </Form.Label>
            <Button variant="danger" className="ml-2" onClick={deleteHandler}>
              Delete File
            </Button>
          </Form.Group>
        ) : (
          <Form.Group controlId="noteFile">
            <Form.Label>File</Form.Label>
            <Form.Control
              label="Choose File"
              onChange={uploadHandler}
              type="file"
            ></Form.Control>
          </Form.Group>
        )}

        <br />
        <Button variant="primary" type="submit">
          Save Note
        </Button>
      </Form>
    </Container>
  );
};

export default NotePage;
