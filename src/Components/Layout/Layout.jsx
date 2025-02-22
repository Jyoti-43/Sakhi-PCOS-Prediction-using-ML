import React, { useEffect, useState } from "react";
import "./layout.css";
import { Link, Outlet, useNavigate, useRoutes } from "react-router-dom";
import { useAuth } from "../ContextHook/AuthProvider";
// import { useAuth } from "../ContextHook/AuthProvider";
import { CgProfile } from "react-icons/cg";

const Layout = () => {
  const { isLoggedIn, logout } = useAuth();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Footer links
  const handleLinkClick = (event, path) => {
    if (!isLoggedIn) {
      event.preventDefault();
      alert("You need to log in first to access this.");
    } else {
      navigate(path);
    }
  };

  
  // logout functionality here
  const handleLogout = () => {
    
    localStorage.removeItem("accessTokens");
    
    
    logout(true); 
    navigate("/");
  };

  
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const loggedInLinks = (
    <>
      <li type="none" className="nav-item">
        <Link to="/trackperiod" className="nav-link">
          <div >Track period</div>
        </Link>
      </li>
      <li type="none" className="nav-item">
        <Link to="/checkpcos" className="nav-link">
          <div>Check PCOS</div>
        </Link>
      </li>

      <li className="nav-item" onClick={toggleDropdown}>
        <div className="nav-icon">
          <CgProfile className="profile-icon" />
        </div>

        {isDropdownOpen && (
          <ul className="dropdown-menu">
            <li>
              <Link to="/changepassword" className="dropdown-item">
                Change Password
              </Link>
            </li>
            <li>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        )}
      </li>
    </>
  );

  const loggedOutLinks = (
    <>
      {/* <li type="none" className="nav-item">
        <Link to="/signup" className="nav-link">
          <div>Signup</div>
        </Link>
      </li> */}
      <li type="none" className="nav-button">
        <Link to="/login">
          <button className="btn  m-3">Login</button>
        </Link>
      </li>
    </>
  );

  return (
    <>
      {/* Header Starts Here */}
      <header
        id="header"
        className="header d-flex align-items-center fixed-top m-0"
      >
        <div className="container container-xl d-flex align-items-center justify-content-between ">
          <div className="logo mx-0 pt-1">
            <img
              src="assets/img/Sakhi-logo.png"
              className="sakhi-logo"
              alt="Sakhi"
            />
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
                {/* new 
                <label for="sidebar-active" className='close-sidebar-button'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                  </svg>
                </label>
                 end */}

                <ul>
                  <li type="none" className="nav-item">
                    <Link to="/">
                      <div className="nav-link"> Home</div>
                    </Link>
                  </li>
                  {/* <li type="none" className="nav-item">
                    <Link to="/pcosprediction" className="nav-link">
                      <div>Check PCOS</div>
                    </Link>
                  </li>
                 
                  <li type="none" className="nav-item">
                    <Link to="/trackperiod" className="nav-link">
                      <div>Track period</div>
                    </Link>
                  </li> */}
                  {/* <li type="none" className="nav-item">
                    <Link to="/contact" className="nav-link">
                      <div>Contact</div>
                    </Link>
                  </li> */}
                  {/* <li type="none" className="nav-item">
                    <Link to="/signup" className="nav-link">
                      <div>Signup</div>
                    </Link>
                  </li>
                  <li type="none" className="nav-button">
                    <Link to="/login">
                      <button className="btn  m-3"> Login</button>
                    </Link>
                  </li> */}

                  {isLoggedIn ? loggedInLinks : loggedOutLinks}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main  starts here */}
      <main id="main">
        {/*  {routing || <Home />}   Render Home by default if no route matches */}
        <Outlet />
      </main>

      {/* Footer  starts here */}
      <footer id="footer" className="footer">
        <div className="footer-content py-3 ">
          <div className="footer-container ">
            {/* <div className="row "> */}
            <div className="footer-about col-lg-4">
              <h3 className="footer-head mx-0"> About </h3>
              <p className="footer-para">
                The Sakhi project is designed to assist individuals in
                understanding and managing PCOS (Polycystic Ovary Syndrome). By
                analyzing key health data, it offers predictions and insights to
                raise awareness and promote healthier lifestyle choices for
                those affected by PCOS. The goal is to empower users with
                knowledge and support for better health outcomes.
              </p>
            </div>

            <div className="footer-navigation col-lg-4  ">
              <h3 className="footer-head">Navigation</h3>
              <div className="navigation-list">
                {/* Header navigation Links */}
                <ul className="footer-links col-lg-6 mx-2 list-unstyled">
                  <li>
                    <Link to="/" className="d-flex align-items-center">
                      <div>
                        <span>Home</span>
                      </div>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/checkpcos"
                      className="d-flex align-items-center"
                      onClick={(e) => handleLinkClick(e, "/checkpcos")}
                    >
                      <div>
                        <span>Check PCOS</span>
                      </div>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/trackperiod"
                      className="d-flex align-items-center"
                      onClick={(e) => handleLinkClick(e, "/trackperiod")}
                    >
                      <div>
                        <span>Track period</span>
                      </div>
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/contact" className="d-flex align-items-center">
                      <div>
                        <span>Contact</span>
                      </div>
                    </Link>
                  </li> */}
                  {/* <li>
                    <Link to="/signup" className="d-flex align-items-center">
                      <div>
                        <span>SignUp</span>
                      </div>
                    </Link>
                  </li> */}
                </ul>
                {/* another column  for  */}
                {/* <ul className="footer-links col-lg-6 mx-2 list-unstyled">
                  <li>
                    <Link to="/" className="d-flex align-items-center">
                      <div>
                        <span>Home</span>
                      </div>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/pcosprediction"
                      className="d-flex align-items-center"
                    >
                      <div>
                        <span>Check PCOS</span>
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
                </ul> */}
              </div>
            </div>

            <div className="footer-logo col-lg-4">
              <div className=" logo-column">
                {/* <span>
                  <h3 className="footer-heading ">Logo Here...</h3>
                </span> */}
                <img src="./assets/img/Sakhi-logo.png" alt="Sakhi Logo" />
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}

        {/* <div className="footer-legal py-2 ">
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
        </div> */}
      </footer>
    </>
  );
};

export default Layout;
