import { Container, Row, Col, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCreateNoteMutation } from "../slices/noteSlice";

const Footer = () => {
  const { userInfo } = useSelector((state) => state.auth) || "";
  const userId = userInfo?._id || "";

  const navigate = useNavigate();
  const [createNote] = useCreateNoteMutation();
  const openNewNote = async (e) => {
    e.preventDefault();
    const newNoteId = await createNote({ userId: userId }).unwrap();
    console.log(newNoteId);
    navigate(`/note/${newNoteId}`);
  };

  return (
    <footer className="fixed-bottom py-3">
      <Container>
        <Row>
          <Col lg={10} md={10} xs={10}></Col>
          <Col className="text-right">
            <Button onClick={openNewNote} variant="primary">
              <FaPlus />
            </Button>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
