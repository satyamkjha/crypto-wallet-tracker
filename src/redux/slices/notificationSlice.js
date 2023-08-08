import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { backendServerBaseURL } from '../../utils/backendServerBaseURL';

const initialState = {
	openCreateNotificationDialog: false,
	openEditNotificationDialog: false,
	selectedNotification: null,
	notifications: [],

	slackChannels: [],
	slackAuthUrl: '',
	slackAuthorized: false,

	telegramAuthorized: false,
	telegramNotificationId: 0,
	openTelegramNotificationsDialog: false,
};

export const getNotifications = createAsyncThunk(
	'notification/getNotifications',
	async (_, thunkAPI) => {
		const token = await localStorage.getItem('accessToken', '');

		let config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		let response = await axios.get(
			`${backendServerBaseURL}/api/notifications`,
			config
		);

		if (response.status === 200) {
			thunkAPI.dispatch(updateNotifications(response.data.data));
		}
	}
);

export const getSlackIntegration = createAsyncThunk(
	'notification/getSlackIntegration',
	async (_, thunkAPI) => {
		const token = await localStorage.getItem('accessToken', '');

		let config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		let response = await axios.get(
			`${backendServerBaseURL}/api/notifications/slack-integration`,
			config
		);

		if (response.status === 200) {
			thunkAPI.dispatch(
				updateSlackAuthorized(response.data.data.slack_authorized)
			);

			if (response.data.data.slack_authorized == false) {
				thunkAPI.dispatch(updateSlackAuthUrl(response.data.data.auth_url));
			} else {
				thunkAPI.dispatch(
					updateSlackChannels(response.data.data.slack_channels)
				);
			}
		}
	}
);

export const getTelegramIntegration = createAsyncThunk(
	'notification/getTelegramIntegration',
	async (_, thunkAPI) => {
		const token = await localStorage.getItem('accessToken', '');

		let config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		let response = await axios.get(
			`${backendServerBaseURL}/api/notifications/telegram-integration`,
			config
		);

		if (response.status === 200) {
			thunkAPI.dispatch(
				updateTelegramAuthorized(response.data.data.telegram_authorized)
			);
			thunkAPI.dispatch(
				updateTelegramNotificationId(
					response.data.data.telegram_notification_id
				)
			);
		}
	}
);

export const sendSlackCode = createAsyncThunk(
	'notification/sendSlackCode',
	async (payload, thunkAPI) => {
		const token = await localStorage.getItem('accessToken', '');

		let config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		let response = await axios.post(
			`${backendServerBaseURL}/api/notifications/slack-integration`,
			{ code: payload.code },
			config
		);

		if (
			response.status === 200 &&
			response.data.message == 'slack authorized successfully'
		) {
			thunkAPI.dispatch(getSlackIntegration());
		}
	}
);

export const createNotification = createAsyncThunk(
	'notification/createNotification',
	async (payload, thunkAPI) => {
		const token = await localStorage.getItem('accessToken', '');

		let config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		let response = await axios.post(
			`${backendServerBaseURL}/api/notifications`,
			{
				address: payload.address,
				email: payload.email,
				slackChannelId: payload.slackChannelId,
				telegramChannelEnabled: payload.telegramChannelEnabled ? 1 : 0,
			},
			config
		);

		if (response.status === 200 && response.data.status === 'ok') {
			thunkAPI.dispatch(updateOpenCreateNotificationDialog(false));
			thunkAPI.dispatch(getNotifications());
		}

		if (response.status === 200 && response.data.status === 'error') {
			payload.setErrors({ afterSubmit: response.data.errors[0] });
		}
	}
);

export const updateNotification = createAsyncThunk(
	'notification/updateNotification',
	async (payload, thunkAPI) => {
		const token = await localStorage.getItem('accessToken', '');

		let config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		let response = await axios.patch(
			`${backendServerBaseURL}/api/notifications`,
			{
				address: payload.address,
				email: payload.email,
				slackChannelId: payload.slackChannelId,
				telegramChannelEnabled: payload.telegramChannelEnabled ? 1 : 0,
			},
			config
		);

		if (response.status === 200 && response.data.status === 'ok') {
			thunkAPI.dispatch(updateOpenEditNotificationDialog(false));
			thunkAPI.dispatch(getNotifications());
		}

		if (response.status === 200 && response.data.status === 'error') {
			payload.setErrors({ afterSubmit: response.data.errors[0] });
		}
	}
);

export const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		updateOpenCreateNotificationDialog: (state, action) => {
			state.openCreateNotificationDialog = action.payload;
		},
		updateOpenEditNotificationDialog: (state, action) => {
			state.openEditNotificationDialog = action.payload;
		},
		updateNotifications: (state, action) => {
			state.notifications = action.payload;
		},
		updateSelectedNotification: (state, action) => {
			state.selectedNotification = action.payload;
		},

		updateSlackChannels: (state, action) => {
			state.slackChannels = action.payload;
		},
		updateSlackAuthUrl: (state, action) => {
			state.slackAuthUrl = action.payload;
		},
		updateSlackAuthorized: (state, action) => {
			state.slackAuthorized = action.payload;
		},

		updateTelegramAuthorized: (state, action) => {
			state.telegramAuthorized = action.payload;
		},
		updateTelegramNotificationId: (state, action) => {
			state.telegramNotificationId = action.payload;
		},

		updateopenTelegramNotificationsDialog: (state, action) => {
			state.openTelegramNotificationsDialog = action.payload;
		},
	},
});

export const {
	updateOpenCreateNotificationDialog,
	updateOpenEditNotificationDialog,
	updateNotifications,
	updateSelectedNotification,

	updateSlackChannels,
	updateSlackAuthUrl,
	updateSlackAuthorized,

	updateTelegramAuthorized,
	updateTelegramNotificationId,

	updateopenTelegramNotificationsDialog,
} = notificationSlice.actions;

export const selectOpenCreateNotificationDialog = (state) =>
	state.notification.openCreateNotificationDialog;
export const selectOpenEditNotificationDialog = (state) =>
	state.notification.openEditNotificationDialog;
export const selectSelectedNotification = (state) =>
	state.notification.selectedNotification;
export const selectNotifications = (state) => state.notification.notifications;

export const selectSlackChannels = (state) => state.notification.slackChannels;
export const selectSlackAuthUrl = (state) => state.notification.slackAuthUrl;
export const selectSlackAuthorized = (state) =>
	state.notification.slackAuthorized;

export const selectTelegramAuthorized = (state) =>
	state.notification.telegramAuthorized;
export const selectTelegramNotificationId = (state) =>
	state.notification.telegramNotificationId;
export const selectopenTelegramNotificationsDialog = (state) =>
	state.notification.openTelegramNotificationsDialog;

export default notificationSlice.reducer;
