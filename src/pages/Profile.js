import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProfile } from "../services/redux/ProfileReducer";
import "../components/auth/Login.css";

const Profile = () => {
  const userData = useSelector((state) => state.profile);
  const [name, setName] = useState(userData.name); // State for name
  const [email, setEmail] = useState(userData.email); // State for email
  const [phone, setPhone] = useState(userData.phone); // State for phone
  const [success, setSuccess] = useState(""); // State for success message
  const [error, setError] = useState(""); // State for error message
  const dispatch = useDispatch();

  // Email validation function
  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isEmailValid(email)) {
      setError("Invalid email format.");
      setSuccess("");
      return;
    }

    // Clear error and set success
    setError("");
    setSuccess("Profile Updated Successfully!");

    // Dispatch updated values to Redux store
    dispatch(
      setProfile({
        name,
        email,
        phone,
      })
    );
  };

  return (
    <div>
      <h2 className="login-header">Hi, {name}. Update your profile.</h2>
      {success && <p style={{ fontWeight: "bold", color: "green", textAlign: "center" }}>{success}</p>}
      {error && <p style={{ fontWeight: "bold", color: "red", textAlign: "center" }}>{error}</p>}

      <form className="login-form-container" onSubmit={handleSubmit}>
        <div className="login-input-container">
          <label htmlFor="name" className="login-label">
            <b>Full Name</b>
          </label>
          <input
            className="login-input-email"
            placeholder="Enter Full Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name state
          />

          <label htmlFor="email" className="login-label">
            <b>Email</b>
          </label>
          <input
            className="login-input-email"
            placeholder="Enter Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
          />

          <label htmlFor="phone" className="login-label">
            <b>Phone</b>
          </label>
          <input
            className="login-input-email"
            placeholder="Enter Phone Number"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)} // Update phone state
          />

          <button type="submit" className="login-button">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
