import { configureStore } from '@reduxjs/toolkit';
import authorizationReducer from '../features/auth/authorizationSlice';
import logoutReducer from '../features/auth/logoutUserSlice'
import overlayReducer from '../features/overlay/overlaySlice'


const store = configureStore({
	reducer: {
		authorization: authorizationReducer,
		overlay: overlayReducer,
		logout: logoutReducer,
	},
});

export default store;