import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { backendServerBaseURL } from '../../utils/backendServerBaseURL';

const initialState = {
	nodes: [],
	relationships: [],
	selectedNode: null,
	selectedNodeInfo: null,
	loadingNodeInfo: null,
	recentTransactions: [],
	loadingRecentTransactions: false,
	selectedEdge: null,
	imageAWSUrl: '',
};

export const getInvestigation = createAsyncThunk(
	'investigation/getInvestigation',
	async (payload, thunkAPI) => {
		const token = await localStorage.getItem('accessToken', '');

		let config = {
			params: {
				address: payload.address,
				chain: payload.chain,
				load_complete_graph: payload.load_complete_graph,
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		let response = await axios.get(
			`${backendServerBaseURL}/api/investigation/${payload.id}`,
			config
		);

		if (response.status === 200) {
			if (payload.do == 'replace') {
				thunkAPI.dispatch(
					JSON.parse(JSON.stringify(updateNodes(response.data.data.nodes)))
				);
				thunkAPI.dispatch(
					updateRelationships(
						JSON.parse(JSON.stringify(response.data.data.relationships))
					)
				);
			}

			if (payload.do == 'append') {
				await thunkAPI.dispatch(appendNodes(response.data.data.nodes));
				await thunkAPI.dispatch(
					appendRelationships(response.data.data.relationships)
				);
			}
		}
	}
);

export const getNodeInfo = createAsyncThunk(
	'investigation/getNodeInfo',
	async (payload, thunkAPI) => {
		thunkAPI.dispatch(updateSelectedNodeInfo(null));
		thunkAPI.dispatch(updateLoadingNodeInfo(true));

		const token = await localStorage.getItem('accessToken', '');

		let config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		let response = await axios.get(
			`${backendServerBaseURL}/api/investigation/${payload.id}/address/${payload.uid}`,
			config
		);

		thunkAPI.dispatch(updateLoadingNodeInfo(false));

		if (response.status === 200) {
			thunkAPI.dispatch(updateSelectedNodeInfo(response.data.data));
		}
	}
);

export const getRecentTransactions = createAsyncThunk(
	'investigation/getRecentTransactions',
	async (payload, thunkAPI) => {
		const token = await localStorage.getItem('accessToken', '');
		thunkAPI.dispatch(updateLoadingRecentTransactions(true));
		thunkAPI.dispatch(updateRecentTransactions([]));

		let config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		let response = await axios.get(
			`${backendServerBaseURL}/api/investigation/${payload.id}/address/${payload.uid}/recent-transactions`,
			config
		);

		thunkAPI.dispatch(updateLoadingRecentTransactions(false));

		if (response.status === 200) {
			thunkAPI.dispatch(updateRecentTransactions(response.data.data));
		}
	}
);

export const updateCustomNotes = createAsyncThunk(
	'investigation/updateCustomNotes',
	async (payload, thunkAPI) => {
		thunkAPI.dispatch(
			updateCustomNoteInSelectedNode({
				custom_note: payload.custom_note,
				uid: payload.uid,
			})
		);
		thunkAPI.dispatch(
			updateCustomNoteInNodes({
				custom_note: payload.custom_note,
				uid: payload.uid,
			})
		);

		const token = await localStorage.getItem('accessToken', '');

		let config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		let response = await axios.patch(
			`${backendServerBaseURL}/api/investigation/${payload.id}/address/${payload.uid}`,
			{
				custom_note: payload.custom_note,
			},
			config
		);

		if (response.status === 200) {
			// thunkAPI.dispatch(updateNodes(response.data.data.nodes))
			// thunkAPI.dispatch(updateRelationships(response.data.data.relationships))
		}
	}
);

export const updateNodeColor = createAsyncThunk(
	'investigation/updateCustomNotes',
	async (payload, thunkAPI) => {
		thunkAPI.dispatch(
			updateColorInSelectedNode({ color: payload.color, uid: payload.uid })
		);
		thunkAPI.dispatch(
			updateColorInNodes({ color: payload.color, uid: payload.uid })
		);

		const token = await localStorage.getItem('accessToken', '');

		let config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		let response = await axios.patch(
			`${backendServerBaseURL}/api/investigation/${payload.id}/address/${payload.uid}`,
			{
				color: payload.color,
			},
			config
		);

		if (response.status === 200) {
			// thunkAPI.dispatch(updateNodes(response.data.data.nodes))
			// thunkAPI.dispatch(updateRelationships(response.data.data.relationships))
		}
	}
);

export const uploadNetworkImage = createAsyncThunk(
	'investigation/uploadNetworkImage',
	async (payload, thunkAPI) => {
		const token = await localStorage.getItem('accessToken', '');

		let config = {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
		};

		await payload.canvas.toBlob(async (blob) => {
			payload.setsharingImageLoading(true);
			let data = new FormData();
			data.append('image', blob);

			let response = await axios.post(
				`${backendServerBaseURL}/api/investigation/${payload.id}/image`,
				data,
				config
			);

			payload.setsharingImageLoading(false);

			if (response.status === 200) {
				thunkAPI.dispatch(updateImageAWSUrl(response.data.data.file_aws_url));
			}
		});
	}
);

export const investigationSlice = createSlice({
	name: 'investigation',
	initialState,
	reducers: {
		resetInvestigationSlice: () => initialState,
		updateNodes: (state, action) => {
			state.nodes = action.payload;
		},
		updateRelationships: (state, action) => {
			state.relationships = action.payload;
		},

		appendNodes: (state, action) => {
			let temp_nodes = state.nodes;
			let final_nodes_to_append = [];
			action.payload.map((targetNode) => {
				let found = false;
				temp_nodes.map((node) => {
					if (node.id === targetNode.id) {
						found = true;
					}
				});
				if (found === false) {
					final_nodes_to_append.push(targetNode);
				}
			});

			temp_nodes = temp_nodes.concat(final_nodes_to_append);
			state.nodes = temp_nodes;
		},
		appendRelationships: (state, action) => {
			let temp_relationships = state.relationships;
			let final_relationships_to_append = [];
			action.payload.map((targetRelationship) => {
				let found = false;
				temp_relationships.map((relationship) => {
					if (relationship.id === targetRelationship.id) {
						found = true;
					}
				});
				if (found === false) {
					final_relationships_to_append.push(targetRelationship);
				}
			});

			temp_relationships = temp_relationships.concat(
				final_relationships_to_append
			);
			state.relationships = temp_relationships;
		},

		updateSelectedNode: (state, action) => {
			state.selectedEdge = null;
			state.selectedNode = action.payload;
		},
		updateSelectedNodeInfo: (state, action) => {
			state.selectedNodeInfo = action.payload;
		},
		updateLoadingNodeInfo: (state, action) => {
			state.loadingNodeInfo = action.payload;
		},
		updateRecentTransactions: (state, action) => {
			state.recentTransactions = action.payload;
		},
		updateLoadingRecentTransactions: (state, action) => {
			state.loadingRecentTransactions = action.payload;
		},

		updateSelectedEdge: (state, action) => {
			state.selectedNode = null;
			state.selectedEdge = action.payload;
		},
		updateCustomNoteInSelectedNode: (state, action) => {
			let tempSelectedNode = { ...state.selectedNode };
			tempSelectedNode.custom_note = action.payload.custom_note;
			state.selectedNode = tempSelectedNode;
		},
		updateCustomNoteInNodes: (state, action) => {
			let tempnodes = [...state.nodes];
			tempnodes.map((node) => {
				if (node.uid == action.payload.uid) {
					node.custom_note = action.payload.custom_note;
				}
			});
			state.nodes = tempnodes;
		},

		updateColorInSelectedNode: (state, action) => {
			let tempSelectedNode = { ...state.selectedNode };
			tempSelectedNode.group = action.payload.color;
			state.selectedNode = tempSelectedNode;
		},
		updateColorInNodes: (state, action) => {
			let tempnodes = [...state.nodes];
			tempnodes.map((node) => {
				if (node.uid == action.payload.uid) {
					node.group = action.payload.color;
				}
			});
			state.nodes = tempnodes;
		},

		updateImageAWSUrl: (state, action) => {
			state.imageAWSUrl = action.payload;
		},
	},
});

export const {
	resetInvestigationSlice,

	updateNodes,
	updateRelationships,

	appendNodes,
	appendRelationships,

	updateSelectedNode,
	updateSelectedNodeInfo,
	updateLoadingNodeInfo,
	updateRecentTransactions,
	updateLoadingRecentTransactions,

	updateSelectedEdge,
	updateCustomNoteInSelectedNode,
	updateCustomNoteInNodes,

	updateColorInSelectedNode,
	updateColorInNodes,

	updateImageAWSUrl,
} = investigationSlice.actions;

export const selectNodes = (state) => state.investigation.nodes;
export const selectRelationships = (state) => state.investigation.relationships;

export const selectSelectedNode = (state) => state.investigation.selectedNode;
export const selectSelectedNodeInfo = (state) =>
	state.investigation.selectedNodeInfo;
export const selectLoadingNodeInfo = (state) =>
	state.investigation.loadingNodeInfo;
export const selectRecentTransactions = (state) =>
	state.investigation.recentTransactions;
export const selectLoadingRecentTransactions = (state) =>
	state.investigation.loadingRecentTransactions;

export const selectSelectedEdge = (state) => state.investigation.selectedEdge;
export const selectImageAWSUrl = (state) => state.investigation.imageAWSUrl;

export default investigationSlice.reducer;
