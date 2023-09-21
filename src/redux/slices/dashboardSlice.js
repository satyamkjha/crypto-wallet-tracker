import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { backendServerBaseURL } from '../../utils/backendServerBaseURL';

const initialState = {
	openCreateInvestigationDialog: false,
	investigations: [],
	planStats: null,
	planStatsLoading: false,
};

export const createInvestigation = createAsyncThunk(
	'dashboard/createInvestigation',
	async (payload, thunkAPI) => {
		const token = await localStorage.getItem('accessToken', '');

		let config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		let response = await axios.post(
			`${backendServerBaseURL}/api/investigations`,
			{
				address: payload.address,
				chain: payload.chain,
			},
			config
		);

		if (response.status === 200) {
			payload.navigate(
				`/investigation/${response.data.data.id}/${response.data.data.number}/${payload.address}/${payload.chain}`
			);
			thunkAPI.dispatch(updateOpenCreateInvestigationDialog(false));
			thunkAPI.dispatch(getPlanStats());
		}
	}
);

export const deleteInvestigation = createAsyncThunk(
	'dashboard/deleteInvestigation',
	async (payload, thunkAPI) => {
		const token = await localStorage.getItem('accessToken', '');

		let config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		let response = await axios.delete(
			`${backendServerBaseURL}/api/investigation/${payload.id}`,
			config
		);

		if (response.status === 200) {
			thunkAPI.dispatch(getAllInvestigations());
			thunkAPI.dispatch(getPlanStats());
		}
	}
);

export const getAllInvestigations = createAsyncThunk(
	'dashboard/getAllInvestigations',
	async (_, thunkAPI) => {
		const token = await localStorage.getItem('accessToken', '');

		let config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		let response = await axios.get(
			`${backendServerBaseURL}/api/investigations`,
			config
		);

		if (response.status === 200) {
			thunkAPI.dispatch(updateInvestigations(response.data.data));
		}
	}
);

export const getPlanStats = createAsyncThunk(
	'dashboard/getPlanStats',
	async (_, thunkAPI) => {
 		thunkAPI.dispatch(updateplanStatsLoading(true));
		const token = await localStorage.getItem('accessToken', '');

		let config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		let response = await axios.get(
			`${backendServerBaseURL}/api/auth/plan/stats`,
			config
		);

		thunkAPI.dispatch(updateplanStatsLoading(false));

		if (response.status === 200) {
			thunkAPI.dispatch(updatePlanStats(response.data.data));
		}
	}
);

export const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {
		updateOpenCreateInvestigationDialog: (state, action) => {
			state.openCreateInvestigationDialog = action.payload;
		},
		updateInvestigations: (state, action) => {
			state.investigations = action.payload;
		},
		updatePlanStats: (state, action) => {
			state.planStats = action.payload;
		},
		updatePlanStatsRemaningNotification: (state, action) => {
			state.planStats.remaining_notifications = action.payload;
		},
		updateplanStatsLoading: (state, action) => {
			state.planStatsLoading = action.payload;
		},
	},
});

export const {
	updateOpenCreateInvestigationDialog,
	updateInvestigations,
	updatePlanStats,
	updateplanStatsLoading,
} = dashboardSlice.actions;

export const selectOpenCreateInvestigationDialog = (state) =>
	state.dashboard.openCreateInvestigationDialog;
export const selectInvestigations = (state) => state.dashboard.investigations;
export const selectPlanStats = (state) => state.dashboard.planStats;
export const selectPlanStatsLoading = (state) =>
	state.dashboard.planStatsLoading;

export default dashboardSlice.reducer;
