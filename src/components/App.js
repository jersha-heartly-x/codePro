import React from "react";
import Editor from './Editor';
import FrontPage from './FrontPage';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage/>}/>
        <Route path="/editor" element={<Editor/>}/>
      </Routes>
    </Router>
  );
}

export default App;
