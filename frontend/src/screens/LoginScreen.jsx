import { Form, Button, Row, Col } from "react-bootstrap";

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";

import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <FormContainer>
        <h1>Sign in</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>
              <strong>Email Address</strong>
              <br />
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <Form.Label>
              <strong>Password</strong>
              <br />
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <br />
          <Button
            disabled={isLoading}
            type="submit"
            variant="primary"
            style={{ backgroundColor: "black", color: "white" }}
          >
            Sign In
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              style={{ color: "blue" }}
            >
              Register
            </Link>
          </Col>
        </Row>
        {isLoading && <Loader />}
      </FormContainer>
    </>
  );
};

export default LoginScreen;
