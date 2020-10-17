import React, { useState } from 'react';
import './Chat.css';
import MicNoneIcon from '@material-ui/icons/MicNone';
import { IconButton } from '@material-ui/core';

function Chat() {
	const [input, setInput] = useState('');

	// fires this function when send button clicked
	const sendMessage = (e) => {
		e.preventDefault();

		// firebase stuff

		setInput('');
	};

	return (
		<div className="chat">
			<div className="chat__header">
				<h4>
					To: <span className="chat__name">Channel name</span>
				</h4>
				<strong>Details</strong>
			</div>

            <div className="chat__messages">
                <h2>I am a message</h2>
                <h2>I am a message</h2>
                <h2>I am a message</h2>
                <h2>I am a message</h2>
            </div>


			<div className="chat__input">
				<form>
					<input type="text" placeholder="iMessage" value={input} onChange={(e) => setInput(e.target.value)} />
					<button onClick={sendMessage}>Send Message</button>
				</form>
				<IconButton>
					<MicNoneIcon />
				</IconButton>
			</div>
		</div>
	);
}

export default Chat;
