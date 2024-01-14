import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "./slices/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const expirationTime = localStorage.getItem("expirationTime");
    if (expirationTime) {
      const currentTime = new Date().getTime();
      if (currentTime > expirationTime) {
        dispatch(logout());
      }
    }
  }, [dispatch]);
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
        <ToastContainer />
      </main>
    </>
  );
};

export default App;
