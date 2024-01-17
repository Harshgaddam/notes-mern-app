/* eslint-disable react/prop-types */
import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaTrash } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

import {
  useDeleteNoteMutation,
  removeNoteFromState,
} from "../slices/noteSlice";

import { useRemoveNoteMutation } from "../slices/userApiSlice";

const Note = ({ note }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id;
  const noteId = note._id;

  const dispatch = useDispatch();

  const [deleteNote] = useDeleteNoteMutation();
  const [removeNote] = useRemoveNoteMutation();

  const handleDeleteClick = async (e) => {
    e.stopPropagation(); // Stop the click event from propagating to the parent LinkContainer
    // console.log("Delete note", note._id);

    await deleteNote(noteId).unwrap();
    await removeNote({ userId: userId, noteId: noteId }).unwrap();

    dispatch(removeNoteFromState(noteId));

    window.location.reload(); // Refresh the page
  };

  return (
    <LinkContainer to={`/${note._id}`}>
      <Card>
        <Card.Body>
          <Card.Title
            as="div"
            className="d-flex justify-content-between align-items-center"
          >
            <strong style={{ color: "black", fontSize: "20px" }}>
              {note.title}
            </strong>
            <Button variant="danger" size="sm" onClick={handleDeleteClick}>
              <FaTrash />
            </Button>
          </Card.Title>

          <Card.Text as="h6">{note.description}</Card.Text>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
};

export default Note;
