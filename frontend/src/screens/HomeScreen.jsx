import { Row, Col } from "react-bootstrap";
import Note from "../components/NoteCard";
import notes from "./notes.js";

const HomeScreen = () => {
  return (
    <>
      <Row>
        {notes.map((note) => (
          <Col key={note._id} sm={12} md={12} lg={12} xl={12}>
            <Note note={note} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
