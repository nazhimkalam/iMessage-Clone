import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import SidebarChat from '../SidebarChat/SidebarChat';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import db from '../../firebase';

function Sidebar() {
	const user = useSelector(selectUser);
	const [chats, setChats] = useState([]);

	useEffect(() => {
		db.collection('chats').onSnapshot((snapshot) => {
			setChats(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			);
		});
	}, []);

	const addChat = () => {
		const chatName = prompt('Please enter a chat name');

		if (chatName) {
			db.collection('chats').add({
				chatName: chatName,
			});
		}
	};
	return (
		<div className="sidebar">
			<div className="sidebar__header">
				<Avatar className="sidebar__avatar" src={user.photo} />
				<div className="sidebar__input">
					<SearchIcon />
					<input type="text" placeholder="Search" />
				</div>
				<IconButton className="sidebar__inputButton" variant="outlined">
					<RateReviewOutlinedIcon onClick={addChat} />
				</IconButton>
			</div>

			<div className="sidebar__chats">
				{chats.map(({ id, data: { chatName } }) => (
					<SidebarChat key={id} id={id} chatName={chatName} />
				))}
			</div>
		</div>
	);
}

export default Sidebar;
