import React, { useEffect, useLayoutEffect } from "react";
import Editor from './Editor';
import Landing from './Landing';
import Signup from './Signup';
import Login from './Login';
import { AuthProvider } from './Auth';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import AboutUs from "./AboutUs";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing/>}/>
          <Route exact path="/editor" element={<Editor/>}/>
          <Route exact path="/signup" element={<Signup/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/about" element={<AboutUs/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
