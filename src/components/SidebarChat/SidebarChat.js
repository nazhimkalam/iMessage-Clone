import { Avatar } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import './SidebarChat.css';

function SidebarChat() {
	const user = useSelector(selectUser);

	return (
		<div className="sidebarChat">
			<Avatar/>
			<div className="sidebarChat__info">
				<h3>Channel Name</h3>
				<p>Last message sent...</p>
				<small>timestamp</small>
			</div>
		</div>
	);
}

export default SidebarChat;
