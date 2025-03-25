import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProtectRoute from './components/auth/ProtectRoute';
import AdminProtect from './components/auth/AdminProtect';


import AuthForm from './pages/AuthForm';
import { Layout } from './components/layout';
import { Home } from './pages/HomePage';
import { ChangPass } from './pages/ChangPass';
import { AdminUsers } from './pages/admin/AdminUsers';
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
						<Route element={<AdminProtect />}>
							<Route path="users" element={<AdminUsers/>} />
						</Route>
					</Route>
				</Route>
			</Routes>
		</Router>
	);
};
export { App };