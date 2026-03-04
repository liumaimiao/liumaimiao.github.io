import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import WordCategorySelection from './components/WordCategorySelection';
import ScenarioList from './components/ScenarioList';
import Scenario from './components/Scenario';
import DictionaryView from './components/DictionaryView';
import PhrasesView from './components/PhrasesView';
import TopMenu from './components/TopMenu';
import About from './components/About';
import STEM from './components/STEM';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <TopMenu />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<WordCategorySelection />} />
            <Route path="/scenarios/:wordCount" element={<ScenarioList />} />
            <Route path="/scenario/:wordCount/:id" element={<Scenario />} />
            <Route path="/dictionary/:wordCount" element={<DictionaryView />} />
            <Route path="/phrases/:wordCount" element={<PhrasesView />} />
            <Route path="/stem" element={<STEM />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
