import { Row, Col } from "react-bootstrap";
import Note from "../components/NoteCard";
import Footer from "../components/Footer";
import { useGetNotesQuery } from "../slices/noteSlice";

const HomeScreen = () => {
  const { data, isLoading, error } = useGetNotesQuery();

  return (
    <>
      {isLoading ? (
        <div>
          <h2>Loading...</h2>
        </div>
      ) : error ? (
        <div>{error?.data.message || error.error}</div>
      ) : (
        <>
          <Row>
            {data.map((note) => (
              <Col key={note._id} sm={12} md={12} lg={12} xl={12}>
                <Note note={note} />
              </Col>
            ))}
          </Row>
          <Footer />
        </>
      )}
    </>
  );
};

export default HomeScreen;
