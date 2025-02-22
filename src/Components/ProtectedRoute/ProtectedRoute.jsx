import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../ContextHook/AuthProvider'; // Adjust path to AuthProvider

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true); // Track if authentication state is loading

  useEffect(() => {
    const storedLoginState = localStorage.getItem("isLoggedIn");
    if (storedLoginState) {
      setIsLoggedIn(true); // If login state exists in localStorage, update context
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false); // Once the login state is checked, set loading to false
  }, [setIsLoggedIn]);

  // While the state is loading, you can show a loading spinner or return null
  if (loading) {
    return null; // or you can return a loading indicator here
  }

  // After loading is complete, check if user is logged in
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
