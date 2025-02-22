import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Contact from "./Components/ContactUs/ContactUs";
import About from "./Components/About/AboutUs";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/ForgetPassword/ResetPassword";
import TrackPeriod from "./Components/TrackPeriod/TrackPeriod";
import { useState } from "react";
import Pcos from "./Components/CheckPcos/Pcos";
import { AuthProvider } from "./Components/ContextHook/AuthProvider";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ChangePassword from "./Components/Profile/ChangePassword";

const App = () => {
  const [markedDates, setMarkedDates] = useState(["2024-01-01", "2024-01-02"]);
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset-password/:uid/:token" element={<ResetPassword/>} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />

            {/* protected route */}
            <Route
              path="/trackperiod"
              element={
                <ProtectedRoute>
                  <TrackPeriod markedDates={markedDates} />
                  </ProtectedRoute> 
              }
            />
             <Route
              path="/checkpcos"
              element={
                <ProtectedRoute>
                  <Pcos/>
                  </ProtectedRoute> 
              }
            />

            <Route
              path="/changePassword"
              element={
                <ProtectedRoute>
                 
                  <ChangePassword />
                 </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
