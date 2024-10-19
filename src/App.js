import './App.css';
import {BrowserRouter as Router , Route , Routes} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Contact from "./Components/ContactUs/ContactUs";
import About from "./Components/About/AboutUs";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Diagnosis from './Components/Diagnosis/Diagnosis';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ChangePassword from './Components/ForgetPassword/ChangePassword';

function App() {
  return ( 
    < >
      
      <Router>
          <Routes>
            <Route path='/' element={<Layout />} >
              <Route index element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/diagnosis" element={<Diagnosis />} />
              <Route path="/forgetpassword" element={<ForgetPassword />} />
              <Route path="/changepassword" element={<ChangePassword />} />
            </Route>
          </Routes>
        </Router>
      
      
     
    </>
  );
}

export default App;
