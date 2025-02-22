import React, { useEffect, useState } from "react";
import "./signup.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      window.google.accounts.id.initialize({
        client_id:
          "391082617038-81ad5f9mn36u9rfarj1b2qjnppb2du8m.apps.googleusercontent.com",
        callback: onGoogleSignIn,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        { theme: "outline", size: "large" }
      );
    };

    if (window.google && window.google.accounts) {
      initializeGoogleSignIn();
    } else {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.body.appendChild(script);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm(input);
    if (Object.keys(formErrors).length === 0) {
      setIsFormValid(true);
      setSubmit(true);
      setErrors({});

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/user/register/",
          input,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        const result = response.data;
        localStorage.setItem("token", result.token);
        navigate("/login"); // Navigate to login after successful registration
      } catch (error) {
        if (error.response) {
          console.error("Response error:", error.response.data);
        } else if (error.request) {
          console.error("Request error:", error.request);
        } else {
          console.error("Error", error.message);
        }
        console.error("Error config:", error.config);
      }
    } else {
      setIsFormValid(false);
      setErrors(formErrors);
      setSubmit(false);
    }

    // Reset form input
    setInput({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const validateForm = (input) => {
    const errors = {};
    if (!input.name) errors.name = "User name is required";
    if (!input.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(input.email))
      errors.email = "Email is invalid";
    if (!input.password) errors.password = "Password is required";
    else if (input.password.length < 6)
      errors.password = "Password must be at least 6 characters long";
    if (!input.confirmPassword)
      errors.confirmPassword = "Confirm Password is required";
    else if (input.password !== input.confirmPassword)
      errors.confirmPassword = "Password and Confirm Password do not match";
    return errors;
  };

  const onGoogleSignIn = async (response) => {
    const id_token = response.credential;

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/user/google-signin/",
        {
          token: id_token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = res.data;
      if (data.success) {
        localStorage.setItem("token", data.token);
        navigate("/"); // Redirect to home page after successful sign-in
      } else {
        console.error("Authentication failed:", data.message);
      }
    } catch (error) {
      console.error("Error:", error.response || error.message);
    }
  };

  return (
    <header>
      {/* <div className="container"> */}
      <div className="signup-container">
        <div className="signup-body">
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="field">
              <h2 className="text-overlay">Welcome, to Sign In page</h2>
              <p className="text-overlay ">
                Create an account to get started with Sakhi</p>
              <hr />
              <div className="form-group">
                <label
                  className="form-label"
                  style={{ display: "block", textAlign: "left" }}
                >
                  Full Name:
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Full Name"
                  value={input.name}
                  onChange={handleChange}
                />
                {errors.name && <div className="error">{errors.name}</div>}
              </div>
              <div className="form-group">
                <label
                  className="form-label"
                  style={{ display: "block", textAlign: "left" }}
                >
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={input.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>
              <div className="form-group">
                <label
                  className="form-label"
                  style={{ display: "block", textAlign: "left" }}
                >
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  value={input.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="error">{errors.password}</div>
                )}
              </div>
              <div className="form-group">
                <label
                  className="form-label"
                  style={{ display: "block", textAlign: "left" }}
                >
                  Confirm Password:
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter Your Confirm Password"
                  value={input.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <div className="error">{errors.confirmPassword}</div>
                )}
              </div>
              <div className="submit-container d-flex justify-content-center align-items-center ">
                <button type="submit" className="submit-button">
                  Register
                </button>
              </div>
            </div>
            <div
              className="mt-3 d-flex justify-content-center align-items-center"
              style={{ position: "relative", width: "100%" }}
            >
              <div
                style={{
                  flex: "1",
                  borderBottom: "1px solid #000",
                  margin: "0 10px",
                }}
              ></div>
              <p style={{ margin: "0" }}>Or</p>
              <div
                style={{
                  flex: "1",
                  borderBottom: "1px solid #000",
                  margin: "0 10px",
                }}
              ></div>
            </div>
            <div className="mt-2 d-flex justify-content-center">
              <div id="google-signin-button"></div>
            </div>
            <div className="mt-3 d-flex justify-content-center ">
              <p className="ml-2 ">
                Already have an account?{" "}
                <Link to="/login" className="login-link">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      {/* </div> */}
    </header>
  );
};

export default SignUp;
