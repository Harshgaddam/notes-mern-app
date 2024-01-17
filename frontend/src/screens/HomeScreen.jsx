import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Note from "../components/NoteCard";
import Footer from "../components/Footer";
import { useGetUserNotesQuery } from "../slices/userApiSlice";
import { addNote } from "../slices/noteSlice";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth) || "";
  const userId = userInfo?._id || "";

  const { data = [] } = useGetUserNotesQuery({ userId }) || "";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) navigate("/login");
  });

  useEffect(() => {
    const fetchData = async () => {
      if (userInfo || data) {
        try {
          if (data) {
            data.map((note) =>
              dispatch(
                addNote({
                  noteId: note._id,
                  title: note.title,
                  description: note.description,
                  content: note.content,
                  file: note.file,
                })
              )
            );
          }
        } catch (error) {
          console.error("Error fetching and dispatching notes:", error);
        }
      }
    };

    userInfo && fetchData();
  }, [userInfo, data, dispatch]);

  return (
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
  );
};

export default HomeScreen;
