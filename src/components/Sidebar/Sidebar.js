import React, { forwardRef, useEffect, useState } from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import SidebarChat from '../SidebarChat/SidebarChat';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import db from '../../firebase';
import { auth } from '../../firebase';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Sidebar() {
	const user = useSelector(selectUser);
	const [chats, setChats] = useState([]);
	const [open, setOpen] = useState(false);

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

	const handleClose = () => {
		setOpen(false);
		auth.signOut();
	};
	return (
		<div className="sidebar">
			<div className="sidebar__header">
				<div>
					<Avatar
						className="sidebar__avatar"
						onClick={() => {
							setOpen(true);
						}}
						src={user.photo}
					/>
				</div>
				<div className="sidebar__input">
					<SearchIcon />
					<input type="text" placeholder="Search" />
				</div>
				<IconButton className="sidebar__inputButton" variant="outlined">
					<RateReviewOutlinedIcon onClick={addChat} />
				</IconButton>
			</div>
			<div>
				<Dialog
					open={open}
					keepMounted
					onClose={() => {
						setOpen(false);
					}}
				>
					<DialogTitle id="alert-dialog-slide-title">Do you wish to Sign Out?</DialogTitle>
					<DialogActions className="logoutButtons">
						<Button
							onClick={() => {
								setOpen(false);
							}}
							color="primary"
						>
							Disagree
						</Button>
						<Button onClick={handleClose} color="primary">
							Agree
						</Button>
					</DialogActions>
				</Dialog>
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

// onClick={() => auth.signOut()} src={user.photo}
