import React from "react";
import Editor from './Editor';
import Landing from './Landing';
import Signup from './Signup';
import Login from './Login';
import { AuthProvider } from './Auth';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing/>}/>
          <Route exact path="/editor" element={<Editor/>}/>
          <Route exact path="/signup" element={<Signup/>} />
          <Route exact path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
