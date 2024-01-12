import { Row, Col } from "react-bootstrap";
import Note from "../components/NoteCard";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";

const HomeScreen = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await axios.get("/api/notes");
      setNotes(data);
    };
    fetchNotes();
  }, []);

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
