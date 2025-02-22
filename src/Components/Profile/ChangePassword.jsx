import React, { useEffect, useState } from "react";
import "./changePassword.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
import { useAuth } from "../ContextHook/AuthProvider"; // Import useAuth

const ChangePassword = () => {
  const { tokens } = useAuth();
 const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [input, setInput] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokens?.accessToken) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [tokens, navigate]);

  const validateForm = (input) => {
    const errors = {};
    if (!input.oldPassword) {
      errors.oldPassword = "Old password is required.";
    }
    if (!input.newPassword) {
      errors.newPassword = "New password is required.";
    } else if (input.newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters long.";
    }
    if (!input.confirmNewPassword) {
      errors.confirmNewPassword = "Please confirm your new password.";
    } else if (input.newPassword !== input.confirmNewPassword) {
      errors.confirmNewPassword = "Passwords do not match.";
    }
    return errors;
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrors({});

    const formErrors = validateForm(input);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    try {
     
      const token = tokens.accessToken;
      console.log("access token ", token);
      console.log("change password  inputs:", input);

      if (!token) {
        setMessage(" no token found. please login again");
        return;
      }

      const response = await axios.post(
        "  https://sakhi-backend-tagn.onrender.com/api/user/changepassword/",
        {
          oldPassword: input.oldPassword, // Ensure these values are populated correctly
          newPassword: input.newPassword,
          confirmNewPassword: input.confirmNewPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/login");
      setIsLoggedIn(false);
      console.log("Sending data to the server...", response.data);

      if (response.data.msg) {
        setMessage("Password changed successfully.");
        setInput({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
        console.log("Password changed successfully.", input);
      } else {
        setMessage("Failed to change password.");
      }
    } catch (error) {
      if (error.response) {
        console.log("Error response:", error.response); // Log the entire error response
        // setMessage(error.response.data.message || "An error occurred.");
        setMessage(
          error.response.data.message || "An error occurred.",
          error.response.data.detail
        );
      } else {
        setMessage("Unable to connect to the server. Please try again.");
        console.error("An error :", error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  return (
    <div className="change-container">
      <div className="change-card">
        <div className="change-card-body">
          <h1>Change Password</h1>
          <hr />
          <p>Please enter your old and new passwords below.</p>
          <form onSubmit={handleChangePassword}>
            <div>
              <label htmlFor="oldPassword">
                Old Password
                <input
                  name="oldPassword"
                  type="password"
                  placeholder="Enter your old password"
                  value={input.oldPassword}
                  onChange={handleChange}
                  required
                />
              </label>
              {errors.oldPassword && (
                <div className="error">{errors.oldPassword}</div>
              )}
            </div>
            <div>
              <label htmlFor="newPassword">
                New Password
                <input
                  name="newPassword"
                  type="password"
                  placeholder="Enter your new password"
                  value={input.newPassword}
                  onChange={handleChange}
                  required
                />
              </label>
              {errors.newPassword && (
                <div className="error">{errors.newPassword}</div>
              )}
            </div>
            <div>
              <label htmlFor="confirmNewPassword">
                Confirm New Password
                <input
                  name="confirmNewPassword"
                  type="password"
                  placeholder="Confirm your new password"
                  value={input.confirmNewPassword}
                  onChange={handleChange}
                  required
                />
              </label>
              {errors.confirmNewPassword && (
                <div className="error">{errors.confirmNewPassword}</div>
              )}
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Change Password"}
            </button>
            {message && <p className="message">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
