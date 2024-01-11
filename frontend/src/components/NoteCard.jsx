/* eslint-disable react/prop-types */
import { Card } from "react-bootstrap";

const Note = ({ note }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title as="div">
          <strong style={{ color: "black", fontSize: "20px" }}>
            {note.title}
          </strong>
        </Card.Title>

        <Card.Text as="h6">{note.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Note;
