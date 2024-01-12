import { Row, Col } from "react-bootstrap";
import Note from "../components/NoteCard";
import notes from "./notes.js";
import Footer from "../components/Footer";

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
      <Footer />
    </>
  );
};

export default HomeScreen;
