import { Container, Row, Col, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const openNewNote = () => {
    navigate("/note");
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
