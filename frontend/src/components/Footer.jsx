import { Container, Row, Col } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Button } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>ProShop &copy; {currentYear}</p>
          </Col>
          <Col xs={1} className="text-center">
            <Button>
              <FaPlus />
            </Button>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
