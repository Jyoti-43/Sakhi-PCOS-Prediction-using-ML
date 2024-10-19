import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";

const Login = ({ isLoggedIn }) => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";
  const [error, setError] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(redirectPath);
    }
  }, [navigate, redirectPath]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError({
      ...error,
      [e.target.name]: e.target.value ? "" : "Required Field",
    });
  };

  const handleClick = () => navigate("/signUp");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("login_API_Here", input);
      localStorage.setItem("token", response.data.token);
      isLoggedIn(true);
      navigate("/home"); // Redirect to home after successful login
    } catch (error) {
      console.log(error);
      // Handle login error
    }
  };

  return (
    <header>
      <div className="container text-center">
        <div className="row align-items-center">
          <div className="col login-logo mb-0">
            <img
              src="./assets/img/aviyanLogo.png"
              alt="Logo"
              className="logo-img"
            />
            <div className="quote">
              "Living with PCOS is a journey of resilience and strength. Every
              step forward is a victory, and every challenge faced is a
              testament to your courage."
            </div>
          </div>
          <div className="col">
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form_body">
                <h2>Welcome to Sakhi</h2>
                <p>Please log into the form</p>
                <label htmlFor="">Email</label>
                <input
                  className="login-input"
                  type="email"
                  id="email"
                  name="username"
                  placeholder="Email"
                  value={input.username}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="">Password</label>
                <input
                  className="login-input"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={input.password}
                  onChange={handleChange}
                  required
                />
                <div className="row align-items-center">
                  <div className="col">
                    <Link to="/forgetpassword">Forget password</Link> 
                    </div>
                    
                  
                  <div className="col">
                    <button type="submit" className="login-btn">
                      Login
                    </button>
                  </div>
                </div>
                <hr />
                <p>Already Have Account?</p>
                <button className="create" onClick={handleClick}>
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Login;
