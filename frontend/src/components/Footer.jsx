import { Container, Row, Col, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addNote, useCreateNoteMutation } from "../slices/noteSlice";

const Footer = () => {
  const { userInfo } = useSelector((state) => state.auth) || "";
  const userId = userInfo?._id || "";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createNote] = useCreateNoteMutation();

  const openNewNote = async (e) => {
    e.preventDefault();
    try {
      const { data: newNoteId } = await createNote({ userId: userId });
      console.log("newNOteId", newNoteId);
      dispatch(
        addNote({
          noteId: newNoteId,
          title: "Untitled",
          description: "",
          content: "",
          file: "",
        })
      );
      navigate(`/${newNoteId}`);
    } catch (error) {
      console.error("Error creating a new note:", error);
    }
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
