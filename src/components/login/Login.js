import { Button } from '@material-ui/core';
import { auth, provider } from '../../firebase';
import React from 'react';
import './Login.css';

function Login() {
	const signIn = () => {
		auth.signInWithPopup(provider).catch((error) => {
			alert('Something went wrong!');
			console.log(error.message);
		});
	};

	return (
		<div className="login">
			<div className="login__logo">
				<img src="https://upload.wikimedia.org/wikipedia/commons/5/56/IMessage_logo_%28Apple_Inc.%29.png" alt="" />
				<h1>iMessage</h1>
			</div>
			<Button onClick={signIn}>Sign In</Button>
		</div>
	);
}

export default Login;
