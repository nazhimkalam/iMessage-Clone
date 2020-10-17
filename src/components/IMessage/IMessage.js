import React from 'react';
import Chat from '../Chat/Chat';
import Sidebar from '../Sidebar/Sidebar';
import './IMessage.css';

function IMessage() {
	return (
		<div className="iMessage">
			<Sidebar />
			<Chat />
		</div>
	);
}

export default IMessage;
