import { Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Note from "../components/NoteCard";

import { useGetUserNotesQuery } from "../slices/userApiSlice";
import { addNote } from "../slices/noteSlice";
import { useCreateNoteMutation } from "../slices/noteSlice";

import { BsPlusLg } from "react-icons/bs";

import "../../public/index.css";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth) || "";
  const userId = userInfo?._id || "";

  const { data = [], refetch } = useGetUserNotesQuery({ userId }) || "";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notes = useSelector((state) => state.notes.myNotes);

  useEffect(() => {
    if (!userInfo) navigate("/login");
    notes && refetch();
  }, [userInfo, notes, refetch, navigate]);

  const [createNote] = useCreateNoteMutation();

  const openNewNote = async (e) => {
    e.preventDefault();
    try {
      const { data: newNoteId } = await createNote({ userId: userId });
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

  useEffect(() => {
    const fetchData = async () => {
      if (userInfo || data) {
        refetch();
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
  }, [userInfo, data, refetch, dispatch]);

  return (
    <section>
      <div>
        <Row>
          {data.map((note) => (
            <Col key={note._id} xs={12}>
              <Note note={note} />
            </Col>
          ))}
        </Row>

        <Button onClick={openNewNote} className="btn addNoteBtn btn-lg ">
          <BsPlusLg />
        </Button>
      </div>
    </section>
  );
};

export default HomeScreen;
