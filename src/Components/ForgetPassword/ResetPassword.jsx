import React, { useEffect, useState } from "react";
import "./forgetPassword.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
// import { set } from "date-fns";

const ChangePassword = () => {
  const { uid, token } = useParams();
  console.log("UID:", uid, "Token:", token);
  const [input, setInput] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setError] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

 
  

  

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const validateForm = (input) => {
    const errors = {};
    if (!input.newPassword) {
      errors.newPassword = "newPassword is required";
    } else if (input.newPassword.length < 6) {
      errors.newPassword = "newPassword must be at least 6 characters long";
    }
    if (!input.confirmNewPassword) {
      errors.confirmNewPassword = "Confirm newPassword is required";
    } else if (input.newPassword !== input.confirmNewPassword) {
      errors.confirmNewPassword =
        "newPassword and Confirm newPassword do not match";
    }
    return errors;
  };
  const formErrors = validateForm(input);

  // const handleChangePassword = async () => {
  //   if (!formErrors && isFormValid) {
  //     setIsFormValid(true);
  //     setError({});
  //     try {
  //       // Retrieve the token from local storage or any other storage mechanism
  //       const token = localStorage.getItem("token");

  //       // Sending newPassword change request to the server
  //       const response = await axios.post(
  //         `https://sakhi-backend-tagn.onrender.com/api/user/resetpassword/${uid}/${token}/`,
  //         {
  //           newPassword: input.newPassword,
  //           confirmNewPassword: input.confirmNewPassword,
            
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Accept: "application/json",
  //             Authorization: `Bearer ${token}`, // Include the token in the Authorization header
  //           },
  //         }
  //       );
  //       setMessage("Password changed successfully.");
  //       setError({});
  //       setInput({ newPassword: "", confirmnewPassword: "" }); // Clear the input fields
  //       if (response.status === 200) {
  //         setMessage("Password reset successful! Redirecting to login...");
  //         setTimeout(() => navigate("/login"), 3000); // Redirect after success
  //       }
  //     } catch (error) {
  //       if (error.response) {
  //         // The request was made and the server responded with a status code
  //         // that falls out of the range of 2xx
  //         setError("Failed to reset password. The link may have expired.");
  //         setMessage("Error: " + error.response.data.message);
  //       } else if (error.request) {
  //         // The request was made but no response was received
  //         setMessage("Error: No response from server.");
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         setMessage("Error: " + error.message);
  //       }
  //     }
  //   } else {
  //     setIsFormValid(false);
  //     setError(formErrors);
  //   }
  // };

  const handleChangePassword = async () => {
    const formErrors = validateForm(input);
    if (Object.keys(formErrors).length === 0) {
      setError({});
      try {
        // Sending new password change request to the server
        const response = await axios.post(
          `https://sakhi-backend-tagn.onrender.com/api/user/resetpassword/${uid}/${token}/`,
          {
            
            newPassword: input.newPassword,
            confirmNewPassword: input.confirmNewPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
  
        setMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
      } catch (error) {
        if (error.response) {
          setMessage("Error: " + error.response.data.message);
        } else {
          setMessage("Error: No response from server.");
        }
      }
    } else {
      setError(formErrors);
    }
  };
  
  return (
    <div className="change-container">
      <div className="change-card">
        <div className="change-card-body">
          <h1>Reset Password</h1>
          <hr />
          <p>Please enter your new password.</p>
          <div>
            <label htmlFor="password">
              {" "}
              Password
              <input
                name="newPassword"
                type="password"
                placeholder="Enter your new password"
                value={input.newPassword}
                onChange={handleChange}
                required
              />
            </label>
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
          <div>
            <label htmlFor="confirmPassword">
              {" "}
              Confirm Password
              <input
                name="confirmNewPassword"
                type="password"
                placeholder="Confirm your new password"
                value={input.confirmNewPassword}
                onChange={handleChange}
                required
              />
            </label>
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
          <button onClick={handleChangePassword}>Change Password</button>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
