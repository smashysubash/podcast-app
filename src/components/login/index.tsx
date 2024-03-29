import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { authService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios, { AxiosError } from "axios";

export const Login = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate("/dashboard");
    }
  }, []);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      console.log(email, password);
      login(email, password);
    }
    setValidated(true);
  };

  const login = async (email: string, password: string) => {
    const toastId = toast.loading("Logging in...");
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      if (response.status === 200 || response.status === 201) {
        toast.success("Log In Successfull", { id: toastId });
        const { token } = response.data;
        localStorage.setItem("token", token);
        navigate("/dashboard");
        return {
          token,
        };
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (!err?.response) {
          toast.error("No Server Response", { id: toastId });
        } else {
          toast.error("Invalid credentials", { id: toastId });
        }
      }
      return false;
    }
  };
  return (
    <Container
      fluid="xs"
      className={`d-flex align-items-center rounded bg-light border ${style.login}`}
      style={{}}
    >
      <Toaster />
      <div className={`m-3 ${style.logindiv} ${style.magicpattern}`}>
        <Form
          style={{ zIndex: 2, position: "inherit" }}
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <h3
            className="p-3 d-flex justify-content-center"
            style={{ position: "sticky", zIndex: 1, fontWeight: "bolder" }}
          >
            LOGIN
          </h3>
          <FloatingLabel
            className="m-3"
            controlId="floatingInput"
            label="Email address"
          >
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@example.com"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Email.
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel
            className="m-3"
            controlId="floatingPassword"
            label="Password"
          >
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </FloatingLabel>
          <div
            className="m-3"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              className={`${style.btm}`}
              style={{
                zIndex: 1,
                position: "sticky",
                backgroundColor: "#6c63ff",
              }}
              type="submit"
            >
              Submit form
            </Button>
          </div>
          <div
            className="m-3"
            style={{ display: "flex", justifyContent: "end" }}
          >
            <Link to="/signup" style={{ paddingRight: "30px" }}>
              Create new account
            </Link>
          </div>
        </Form>
      </div>
    </Container>
  );
};
