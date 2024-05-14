import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { MyButton } from "../../components/UI/button/MyButton";
import { useSelector, useDispatch } from "react-redux";
import { userApi } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../../store/slices/userSlice"; // Import signUpUser from userSlice

export const SignUp = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isAuthorized, userData } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, username, password } = formData;
    try {
      dispatch(signUpUser(formData));
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      navigate("/");
      console.log(userData);
    }
  }, [isAuthorized, navigate]);

  return (
    <div className="containerSignUp">
      <div className="heading">Sign Up</div>
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            required
            className="input"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            required
            className="input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            required
            className="input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </Form.Group>
        <MyButton type="submit">Sign up</MyButton>
      </Form>
      {isLoading && <h1>Іде загрузка...</h1>}
      {isError && <h1>{isError}</h1>}
    </div>
  );
};
