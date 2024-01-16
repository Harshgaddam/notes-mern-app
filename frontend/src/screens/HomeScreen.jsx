import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Note from "../components/NoteCard";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useGetUserNotesQuery } from "../slices/userApiSlice";
import { addNote } from "../slices/noteSlice";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth) || "";
  const userId = userInfo?._id || "";

  const { data, isLoading, error, refetch } =
    useGetUserNotesQuery({ userId }) || [];

  const dispatch = useDispatch();

  useEffect(() => {
    refetch();
    const fetchData = async () => {
      try {
        data.map((note) =>
          dispatch(
            addNote({
              _id: note._id,
              title: note.title,
              description: note.description,
              content: note.content,
            })
          )
        );
      } catch (error) {
        console.error("Error fetching and dispatching notes:", error);
      }
    };

    fetchData();
  }, [userId, data, dispatch, refetch]);

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
