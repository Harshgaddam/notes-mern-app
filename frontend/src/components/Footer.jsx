import { Container, Row, Col } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const openNewNote = () => {
    navigate("/note");
  };

  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>ProShop &copy; {currentYear}</p>
          </Col>
          <Col xs={1} className="text-center">
            <Button onClick={openNewNote}>
              <FaPlus />
            </Button>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
