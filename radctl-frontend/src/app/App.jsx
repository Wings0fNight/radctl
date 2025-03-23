import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectRoute from './components/auth/ProtectRoute';
import { Home } from './pages/HomePage';
import { ChangPass } from './pages/ChangPass';
import AuthForm from './pages/AuthForm';
import {Layout} from './components/Layout';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/auth" element={<AuthForm />} />
        
        <Route element={<ProtectRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="change-password" element={<ChangPass />} />
          </Route>
        </Route>
        {/* <Route path="*" element={<Navigate to="/auth" replace />} /> */}
      </Routes>
    </Router>
  );
};

export { App };