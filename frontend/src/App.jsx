import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { useTranslation } from 'react-i18next';

// i18n
import './i18n';

// Import Components
import ThemeToggle from './components/ThemeToggle';
import LanguageSelector from './components/LanguageSelector';
import Chatbot from './components/Chatbot';

// Import Pages (To be created)
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import GamesMenu from './pages/GamesMenu';
import MemoryRecall from './games/MemoryRecall';
import PatternMatching from './games/PatternMatching';
import ReactionTime from './games/ReactionTime';
import VoiceRecording from './pages/VoiceRecording';

import './App.css';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const Navigation = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  if (!user) return null;
  return (
    <nav style={{ 
      padding: '1rem 2rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      borderBottom: '1px solid var(--colorBorder)',
      backgroundColor: 'var(--colorBgDark)'
    }}>
      <Link to="/dashboard" style={{textDecoration:'none'}}><h2 className="gradient-text mb-1">{t("CogniCare")}</h2></Link>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/dashboard" className="text-secondary" style={{textDecoration:'none', fontWeight: '500'}}>{t("Dashboard")}</Link>
        <Link to="/games" className="text-secondary" style={{textDecoration:'none', fontWeight: '500'}}>{t("Games")}</Link>
        <Link to="/voice" className="text-secondary" style={{textDecoration:'none', fontWeight: '500'}}>{t("Voice Test")}</Link>
        
        <LanguageSelector />
        <ThemeToggle />

        <span className="text-secondary" style={{marginLeft: '1rem', borderLeft: '1px solid var(--colorBorder)', paddingLeft: '1rem'}}>{user.name}</span>
        <button className="btn-secondary" style={{padding: '0.4rem 1rem', fontSize: '0.9rem'}} onClick={logout}>{t("Logout")}</button>
      </div>
    </nav>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Navigation />
          <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Auth isLogin={true} />} />
            <Route path="/register" element={<Auth isLogin={false} />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/games" element={<ProtectedRoute><GamesMenu /></ProtectedRoute>} />
            <Route path="/games/memory" element={<ProtectedRoute><MemoryRecall /></ProtectedRoute>} />
            <Route path="/games/pattern" element={<ProtectedRoute><PatternMatching /></ProtectedRoute>} />
            <Route path="/games/reaction" element={<ProtectedRoute><ReactionTime /></ProtectedRoute>} />
            <Route path="/voice" element={<ProtectedRoute><VoiceRecording /></ProtectedRoute>} />
          </Routes>
        </main>
        <Chatbot />
      </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
