import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "./slices/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const userInfo = localStorage.getItem("userInfo") || "";
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      dispatch(logout());
    }
    const expirationTime = localStorage.getItem("expirationTime");
    if (expirationTime) {
      const currentTime = new Date().getTime();
      if (currentTime > expirationTime) {
        toast.error("Session expired, please login again");
        dispatch(logout());
      }
    }
  }, [userInfo, dispatch]);

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
