import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectRoute from './components/ProtectRoute';
import { Home } from '../home/HomePage';
import AuthForm from '../auth/AuthForm';
import './styles/App.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <ProtectRoute>
            <Home />
          </ProtectRoute>
        }/>
        <Route path="/auth" element={<AuthForm />} />
      </Routes>
    </Router>
  );
};

export {App};