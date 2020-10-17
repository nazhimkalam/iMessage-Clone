import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: 0,
	},
	reducers: {
		login: (state, action) => {
			state.user = 1;
		},
		logout: (state) => {
			state.user = 1;
		},
	},
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.counter.user;

export default userSlice.reducer;
