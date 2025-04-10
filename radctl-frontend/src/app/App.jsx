import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ProtectRoute from './components/protect/ProtectRoute';
import AdminProtect from './components/protect/AdminProtect';
import { Layout } from './components/layout';
import { LayoutRadUsers } from './components/admin/LayoutRadUsers';

import AuthForm from './pages/AuthForm';
import { Home } from './pages/HomePage';
import ChangePass from './pages/ChangePass';
import RadUsers from './pages/admin/RadUsers'
import City from './pages/admin/City'

import './styles/App.css';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/auth" element={<AuthForm />} />
				<Route element={<ProtectRoute />}>
					<Route element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="change-password" element={<ChangePass />} />

						<Route element={<LayoutRadUsers />}>
							<Route path="admins-radusers" element={<RadUsers />} />
						</Route>
						<Route path='admins-city' element={<City />} />
						{/* <Route path="admins-raduserssettings" element={<AdminUsers/>} /> */}
						<Route element={<AdminProtect />}>
							
						</Route>
					</Route>
				</Route>
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</Router>
	);
};
export { App };