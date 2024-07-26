import React from 'react'
import "./layout.css"
import { Link, useRoutes } from 'react-router-dom'
import Home from '../Home/Home'
import Contact from '../ContactUs/ContactUs'
import About from '../About/AboutUs'
import Diagnosis from '../Diagnosis/Diagnosis'

const Layout = () => {

  //  Routine for rendering main content
  const routing = useRoutes([
    { path: "/home", element: <Home /> },
    { path: "/contact", element: <Contact /> },
    { path: "/about", element: <About /> },
    { path: "/diagnosis", element: <Diagnosis /> }

  ])

  return (
    <>

      {/* Header Starts Here */}
      <header id="header" className="header d-flex align-items-center fixed-top m-0">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between ">

          <div className='logo mx-0 pt-1'>
            Logo
            {/* <img src="assets/img/aviyanLogo.png" className='' alt="Aviyan Sarathi" style={{ maxWidth: '250px', maxHeight: '150px' }} /> */}
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


          <div className="position-relative">

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

                  <li type="none" className='nav-item'> <Link to="/" className='nav-link' >Home</Link> </li>
                  <li type="none" className='nav-item'> <Link to="/about" className='nav-link'>About</Link> </li>
                  <li type="none" className='nav-item'> <Link to="/contact" className='nav-link'>Contact</Link> </li>
                  <li type="none" className='nav-item'> <Link to="/diagnosis" className='nav-link'>Diagnosis</Link></li>

                  <li type="none">
                    <Link to='/login'> <button className="btn  m-3" > Login</button></Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main  starts here */}
      <main id="main">
        {routing || <Home />} {/* Render Home by default if no route matches */}

      </main>


      {/* Footer  starts here */}
      <footer id="footer" className="footer flex-shrink">

        <div className="footer-content py-3 ">
          <div className="container ">

            <div className="row g-2">
              <div className="col-lg-2">
                <h3 className="footer-heading mx-0"> <Link to="/about" className='text-white '>  About </Link></h3>
                <h5 className="footer-para" >Somethings Here........
                </h5>

              </div>



              <div className="col-lg-3 mx-4">
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
                </ul>
              </div>

              <div className="col-lg-1 col-1 mx-0 position-relative logo-column">
                <span><h3 className="footer-heading ">Logo Here...</h3></span>
                <img src="" className="img-fluid my-5 logo-footer" alt="Sakhi Logo" />


              </div>



            </div>
          </div>
        </div>

        <div className="footer-legal py-2 ">
          <div className="container">

            <div className="row g-6 justify-content-between m-0">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0 p-0">
                <div className="copyright">
                  © Copyright2024 <strong><span>Sakhi</span></strong>. All Rights Reserved
                </div>
              </div>

              <div className="col-md-6">
                <div className="social-links mb-3 mb-lg-0 text-center text-md-end">
                  <div className="credits">
                    Designed by : Team Sakhi
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>

      </footer>

    </>
  )
}

export default Layout