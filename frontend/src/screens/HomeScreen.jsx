import { Row, Col } from "react-bootstrap";
import Note from "../components/NoteCard";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useGetUserNotesQuery } from "../slices/userApiSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addNote } from "../slices/noteSlice";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth) || "";
  const userId = userInfo?._id || "";

  const { data, isLoading, error } = useGetUserNotesQuery({ userId }) || [];

  const dispatch = useDispatch();

  if (data) {
    data.map((note) => {
      dispatch(
        addNote({
          _id: note._id,
          title: note.title,
          description: note.description,
          content: note.content,
        })
      );
    });
  }

  return (
    <>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : error ? (
        <Loader />
      ) : (
        <>
          <Row>
            {data.map((note) => (
              <Col key={note._id} xs={12}>
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
