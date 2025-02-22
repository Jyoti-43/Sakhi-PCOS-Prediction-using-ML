import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  

  const [tokens, setTokens] = useState({
    accessToken: "",
    refreshToken: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  


  useEffect(() => {
    // Retrieve the tokens from localStorage
    const storedTokens = JSON.parse(localStorage.getItem("authTokens"));
    const storedLoginState = localStorage.getItem("isLoggedIn");
console.log(storedTokens);
console.log(storedLoginState);
    if (storedTokens && storedLoginState === "true") {
      setTokens(storedTokens); // Set tokens from localStorage
      setIsLoggedIn(true); // Mark as logged in
    } else {
      setIsLoggedIn(false); // If no login state, set as false
    }
  }, []); 

  const setAuthTokens = (accessToken, refreshToken) => {
    const tokens = { accessToken, refreshToken };
    setTokens(tokens); // Update tokens in state
    setIsLoggedIn(true); // Set logged-in state to true
    localStorage.setItem("authTokens", JSON.stringify(tokens)); // Store tokens in localStorage
    localStorage.setItem("isLoggedIn", true); // Store logged-in state in localStorage
  };

  const login = (accessToken, refreshToken) => {
    const tokens = { accessToken, refreshToken };
    localStorage.setItem("authTokens", JSON.stringify(tokens)); // Store tokens in localStorage
    localStorage.setItem("isLoggedIn", true); // Store login state
    setTokens(tokens); // Update state with the tokens
    setIsLoggedIn(true);
   
  };

  const logout = () => {
    localStorage.removeItem("authTokens");

    localStorage.removeItem("isLoggedIn");
    setTokens({ accessToken: "", refreshToken: "" });
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, tokens, setAuthTokens , setIsLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
