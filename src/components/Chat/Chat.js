import React, { useEffect, useState } from 'react';
import './Chat.css';
import MicNoneIcon from '@material-ui/icons/MicNone';
import { IconButton } from '@material-ui/core';
import Message from '../Message/Message';
import { selectChatId, selectChatName } from '../../features/chatSlice';
import { useSelector } from 'react-redux';
import db from '../../firebase';
import firebase from 'firebase';
import { selectUser } from '../../features/userSlice';

function Chat() {
	const [input, setInput] = useState('');
	const chatName = useSelector(selectChatName);
	const [messages, setMessages] = useState([]);
	const chatId = useSelector(selectChatId);
	const user = useSelector(selectUser);

	useEffect(() => {
		if (chatId) {
			db.collection('chats')
				.doc(chatId)
				.collection('messages')
				.orderBy('timestamp', 'desc')
				.onSnapshot((snapshot) =>
					setMessages(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							data: doc.data(),
						}))
					)
				);
		}
	}, [chatId]);

	// fires this function when send button clicked
	const sendMessage = (e) => {
		e.preventDefault();

		db.collection('chats').doc(chatId).collection('messages').add({
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			message: input,
			uid: user.uid,
			photo: user.photo,
			email: user.email,
			displayName: user.displayName,
		});

		setInput('');
	};

	return (
		<div className="chat">
			<div className="chat__header">
				<h4>
					To: <span className="chat__name">{chatName}</span>
				</h4>
				<strong>Details</strong>
			</div>

			<div className="chat__messages">
				{messages.map(({ id, data }) => (
					<Message key={id} id={id} contents={data} />
				))}
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
