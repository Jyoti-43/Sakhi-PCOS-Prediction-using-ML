import React, { useState } from "react";
import axios from "axios";

const ChangePassword = () => {
  const [input, setInput] = useState({ password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePassword = async () => {
    try {
      // Retrieve the token from local storage or any other storage mechanism
      const token = localStorage.getItem("token");

       // Sending password change request to the server
      const response = await axios.post(
        "http://localhost:8000/api/user/reset-password/",
        { password: input.password, confirmPassword: input.confirmPassword },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      setMessage("Password changed successfully.");
        
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setMessage("Error: " + error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        setMessage("Error: No response from server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setMessage("Error: " + error.message);
      }
    }
    setInput({ password: "", confirmPassword: "" });  // Clear the input fields 
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h1>Change Password</h1>
          <hr />
          <p>Please enter your new password.</p>
          <div>
            <label htmlFor="password">
              {" "}
              Password
              <input
                type="password"
                placeholder="Enter your new password"
                value={input.password}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="confirmPassword">
              {" "}
              Confirm Password
              <input
                type="password"
                placeholder="Confirm your new password"
                value={input.confirmPassword}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <button className="btn btn-primary" onClick={handleChangePassword}>
            Change Password
          </button>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
