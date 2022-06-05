import React from "react";
import Editor from './Editor';
import Landing from './Landing';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing/>}/>
        <Route exact path="/editor" element={<Editor/>}/>
      </Routes>
    </Router>
  );
}

export default App;
