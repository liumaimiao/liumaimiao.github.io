import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LearningCanvas from './components/LearningCanvas';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn/:count" element={<LearningCanvas />} />
      </Routes>
    </Router>
  );
}

export default App;
