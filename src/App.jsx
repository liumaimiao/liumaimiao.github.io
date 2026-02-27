import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import WordCategorySelection from './components/WordCategorySelection';
import ScenarioList from './components/ScenarioList';
import Scenario from './components/Scenario';
import DictionaryView from './components/DictionaryView';
import PhrasesView from './components/PhrasesView';
import LoginModal from './components/LoginModal';
import VerifyMagicLink from './components/VerifyMagicLink';
import PaymentSuccess from './components/PaymentSuccess';
import './App.css';

function UserHeader() {
  const { user, loading, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  if (loading) return null;

  return (
    <>
      <div className="user-header">
        {user ? (
          <div className="user-info">
            <span>👤 {user.email || 'User'}</span>
            <span className={`tier-badge ${user.membership === 'free' ? 'free' : ''}`}>
              {user.membership === 'premium' ? '⭐ Premium' : 'Free'}
            </span>
            <button className="logout-btn" onClick={logout}>退出 Logout</button>
          </div>
        ) : (
          <button className="login-trigger" onClick={() => setShowLogin(true)}>
            登录 / Login
          </button>
        )}
      </div>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <UserHeader />
        <Routes>
          <Route path="/" element={<WordCategorySelection />} />
          <Route path="/scenarios/:wordCount" element={<ScenarioList />} />
          <Route path="/scenario/:wordCount/:id" element={<Scenario />} />
          <Route path="/dictionary/:wordCount" element={<DictionaryView />} />
          <Route path="/phrases/:wordCount" element={<PhrasesView />} />
          <Route path="/verify" element={<VerifyMagicLink />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
