/* eslint-disable react/prop-types */
import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Note = ({ note }) => {
  return (
    <LinkContainer to={`/${note._id}`}>
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
    </LinkContainer>
  );
};

export default Note;
