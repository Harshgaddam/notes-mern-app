import { Row, Col } from "react-bootstrap";

import { useSelector } from "react-redux";
import { useEffect } from "react";

import Note from "../components/NoteCard";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import { useGetUserNotesQuery } from "../slices/userApiSlice";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth) || "";
  const userId = userInfo?._id || "";

  const { data, isLoading, error, refetch } =
    useGetUserNotesQuery({ userId }) || [];

  useEffect(() => {
    refetch();
  }, [userId, refetch]);

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
