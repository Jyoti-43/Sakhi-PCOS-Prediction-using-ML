import React, { useState } from "react";
import axios from "axios";
import "./forgetPassword.module.css";
import { Link } from "react-router-dom";


const ResetOTP = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendResetLink = async () => {
    try {
      // Sending email to server to send reset password link
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/reset-password/",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          Accept : "application/json",
          },
        }
      );

      const result = response.data;
      setMessage("A reset password link has been sent to your email.");
      
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
    setEmail("");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="card">
          <div className="card-body">
            <h1>Forgot Password</h1>
            <hr />
            <p>Please enter your email to send a reset password link.</p>
            <label htmlFor="Email">
              {" "}
              Email
              <input
                type="email"
                
                placeholder="Enter your email"
                value={email}
                onChange={handleChange}
              />
            </label>
            <div>
              <button onClick={handleSendResetLink}>Send Reset Link</button>
              {message && <p className="message">{message}</p>}
            </div>
            <Link to="/changePassword"> <p>Change Password</p></Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResetOTP;
