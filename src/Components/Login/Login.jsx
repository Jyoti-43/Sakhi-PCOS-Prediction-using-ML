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


  useEffect(() => {
    const initializeGoogleSignIn = () => {
      window.google.accounts.id.initialize({
        client_id: '391082617038-81ad5f9mn36u9rfarj1b2qjnppb2du8m.apps.googleusercontent.com',
        callback: onGoogleSignIn,
      });
      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        { theme: 'outline', size: 'large' }
      );
    };

    if (window.google && window.google.accounts) {
      initializeGoogleSignIn();
    } else {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.body.appendChild(script);
    }
  }, []);

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

  const onGoogleSignIn = async (response) => {
    const id_token = response.credential;

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/user/google-signin/', {
        token: id_token,
    }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = res.data;
      if (data.success) {
        localStorage.setItem('token', data.token);
        navigate("/"); // Redirect to home page after successful sign-in
      } else {
        console.error('Authentication failed:', data.message);
      }
    } catch (error) {
      console.error('Error:', error.response || error.message);
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
                <div className="mt-3 d-flex justify-content-center align-items-center" style={{ position: 'relative', width: '100%' }}>
                <div style={{ flex: '1', borderBottom: '1px solid #000', margin: '0 10px' }}></div>
                <p style={{ margin: '0' }}>Or</p>
                <div style={{ flex: '1', borderBottom: '1px solid #000', margin: '0 10px' }}></div>
              </div>
                <div className="mt-2 d-flex justify-content-center">
                
                <div id="google-signin-button"></div>
                </div>
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
