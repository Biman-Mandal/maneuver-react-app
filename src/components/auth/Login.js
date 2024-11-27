import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
import avatarImage from "../../assets/images/login_placeholder.jpg";
import { useDispatch } from "react-redux";
import { useLoginUserMutation } from "../../services/apis/UserAuth"; // Adjust import path
import { setProfile } from "../../services/redux/ProfileReducer";
import "./Login.css";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [validateError, setValidateError] = useState("");
  const dispatch = useDispatch();
  const [loginUser, { isLoading, isSuccess, isError, error, data }] = useLoginUserMutation();
  const [loginError, setLoginError] = useState("");

  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 6;
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isEmailValid(email)) {
      setValidateError("Invalid email format.");
      return;
    }
    if (!isPasswordValid(password)) {
      setValidateError("Password must be at least 6 characters long.");
      return;
    }

    // Prepare user data for the login request
    const userData = {
      emailorphone: email,
      user_type: 1,
      password: password,
    };

    // Perform the login request
    try {
      const response = await loginUser(userData).unwrap(); // unwrap() gives you direct response

      const loginToken = response.token;
      login(loginToken); // Login and connect socket
      dispatch(setProfile({
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
      }));
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      console.error("Login failed:", err);
      setLoginError("Login failed. Please check your credentials.");
    }
  };

  // Log error or success during render
  if (isError) {
    console.error("Error details:", JSON.stringify(error, null, 2)); // Log the error object in a readable format
    if (error && error.response) {
      console.error("Error response:", error.response);
    }
  }

  return (
    <div>
      <h2 className="login-header">Login Form</h2>
      <form className="login-form-container" onSubmit={handleSubmit}>
        <div className="login-imgcontainer">
          <img src={avatarImage} alt="Avatar" className="login-avatar" />
        </div>

        <div className="login-input-container">
          <label htmlFor="email" className="login-label">
            <b>Email</b>
          </label>
          <input
            className="login-input-email"
            placeholder="Enter Email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
          <label htmlFor="password" className="login-label">
            <b>Password</b>
          </label>
          <input
            className="login-input-password"
            type="password"
            placeholder="Enter Password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {isSuccess && <p>Login successful!</p>}
          {isError && <p>Error: {error?.message || 'Login failed. Please check your credentials.'}</p>}
          {loginError && <p>{loginError}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
