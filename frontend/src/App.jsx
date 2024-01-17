import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "./slices/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const expirationTime = localStorage.getItem("expirationTime");
    if (expirationTime) {
      const currentTime = new Date().getTime();
      if (currentTime > expirationTime) {
        // Show a toast notification for logout

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
      </main>
      <ToastContainer />
    </>
  );
};

export default App;
