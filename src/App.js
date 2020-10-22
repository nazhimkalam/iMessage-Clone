import { auth } from './firebase';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import IMessage from './components/IMessage/IMessage';
import Login from './components/login/Login';
import { login, logout, selectUser } from './features/userSlice';

function App() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				// user is logged in
				dispatch(
					login({
						uid: authUser.uid,
						photo: authUser.photoURL,
						email: authUser.email,
						displayName: authUser.displayName,
					})
				);
			} else {
				// user is logged out
				dispatch(logout());
			}
		});
	}, []);

	return <div className="app">{user ? <IMessage /> : <Login />}</div>;
}

export default App;
