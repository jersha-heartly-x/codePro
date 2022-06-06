import React, { useEffect, useState } from "react";
import firebaseConfig from "../config.js";
import { BallTriangle } from "react-loader-spinner";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    firebaseConfig.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return (
      <div style={{
        backgroundColor: '#1b1b1b',
        height : '100vh',
        display: 'flex',
        justifyContent : 'center',
        alignItems : 'center',
      }}>
        <BallTriangle
          color= "#0d00f1"
          height={50}
          width={50}
        />
      </div>
    )
  }
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};