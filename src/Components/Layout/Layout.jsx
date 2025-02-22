import React from "react";
import "./layout.css";
import { Link, Outlet, useRoutes } from "react-router-dom";
import Home from "../Home/Home";
import Contact from "../ContactUs/ContactUs";
import About from "../About/AboutUs";
import Diagnosis from "../Diagnosis/Diagnosis";
import SignUp from "../SignUp/SignUp";

const Layout = () => {
  //  Routine for rendering main content

  return (
    <>
      {/* Header Starts Here */}
      <header
        id="header"
        className="header d-flex align-items-center fixed-top m-0"
      >
        <div className="container container-xl d-flex align-items-center justify-content-between ">
          
          <div className="logo mx-0 pt-1">
          
            <img src="assets/img/Sakhi-logo.png" className='sakhi-logo' alt="Sakhi"  />
          </div>
          {/* new 
          <input type="checkbox" id="sidebar-active" />
          <label for="sidebar-active" className='open-sidebar-button '>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
            </svg>
          </label>
          <label id="overlay" for="sidebar-active"></label>
         new end */}

          <div className="position-static">
            <nav id="navbar" className="navbar navbar-expand-lg  navbar-dark ">
              <div className="navbar-nav mr-auto mt-2 mt-lg-0">

                <ul>
                  <li type="none" className="nav-item">
                    {" "}
                    <Link to="/" className="nav-link">
                      Home
                    </Link>{" "}
                  </li>
                  <li type="none" className="nav-item">
                    {" "}
                    <Link to="/about" className="nav-link">
                      About
                    </Link>{" "}
                  </li>
                  <li type="none" className="nav-item">
                    {" "}
                    <Link to="/contact" className="nav-link">
                      Contact
                    </Link>{" "}
                  </li>
                  <li type="none" className="nav-item">
                    {" "}
                    <Link to="/diagnosis" className="nav-link">
                      Diagnosis
                    </Link>
                  </li>
                  <li type="none" className="nav-item">
                    {" "}
                    <Link to="/signup" className="nav-link">
                      Signup
                    </Link>
                  </li>
                  <li type="none">
                    <Link to="/login">
                      {" "}
                      <button className="btn  m-3"> Login</button>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main  starts here */}
      <main id="main">
        {/*   {routing || <Home />} Render Home by default if no route matches */}
        <Outlet />
      </main>

      {/* Footer  starts here */}
      <footer id="footer" className="footer">
        <div className="footer-content py-3 ">
          <div className="footer-container ">
            {/* <div className="row "> */}
              <div className="footer-about col-lg-1">
                <h3 className="footer-heading mx-0">
                  {" "}
                  <Link to="/about" className="text-white ">
                    {" "}
                    About{" "}
                  </Link>
                </h3>
                <p className="footer-para">Somethings Here........</p>
              </div>


              <div className="footer-navigation col  ">
                <h3 className="footer-heading mx-2">Navigation</h3>

                <ul className="footer-links  list-unstyled">
                  <li>
                    <Link to="/" className="d-flex align-items-center">
                      <div>
                        <span>Home</span>
                      </div>
                    </Link>
                  </li>

                  <li>
                    <Link to="/about" className="d-flex align-items-center">
                      <div>
                        <span>About</span>
                      </div>
                    </Link>
                  </li>

                  <li>
                    <Link to="/contact" className="d-flex align-items-center">
                      <div>
                        <span>Contact</span>
                      </div>
                    </Link>
                  </li>

                  <li>
                    <Link to="/diagnosis" className="d-flex align-items-center">
                      <div>
                        <span>Diagnosis</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" className="d-flex align-items-center">
                      <div>
                        <span>SignUp</span>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className=" logo-column">
                {/* <span>
                  <h3 className="footer-heading ">Logo Here...</h3>
                </span> */}
                <img
                  src=""
                  
                  alt="Sakhi Logo"
                />
              </div>
            </div>
          </div>
        {/* </div> */}

        <div className="footer-legal py-2 ">
          <div className="container">
            <div className="row g-6 justify-content-between m-0">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0 p-0">
                <div className="copyright">
                  © Copyright2024{" "}
                  <strong>
                    <span>Sakhi</span>
                  </strong>
                  . All Rights Reserved
                </div>
              </div>

              <div className="col-md-6">
                <div className="social-links mb-3 mb-lg-0 text-center text-md-end">
                  <div className="credits">Designed by : Team Sakhi</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
