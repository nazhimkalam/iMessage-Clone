import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import IMessage from './components/IMessage/IMessage';
import Login from './components/login/login';
import { selectUser } from './features/userSlice';

function App() {
	const user = useSelector(selectUser);

	return (
		<div className="app">
			{ user ? <IMessage /> : <Login />}
		</div>
	);
}

export default App;
