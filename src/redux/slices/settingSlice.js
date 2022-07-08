import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { backendServerBaseURL } from '../../utils/backendServerBaseURL';

const initialState = {
  userInfo: null
};

export const getUserInfo = createAsyncThunk(
  'setting/getUserInfo',
  async (_, thunkAPI) => {
    const token = await localStorage.getItem("accessToken", "")

    let config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    let response = await axios.get(`${backendServerBaseURL}/api/auth/user`, config);

    if (response.status === 200) {
      thunkAPI.dispatch(updateUserInfo(response.data.data))
    }
  }
);

export const updateUserEmail = createAsyncThunk(
  'setting/updateUserEmail',
  async (payload, thunkAPI) => {
    const token = await localStorage.getItem("accessToken", "")

    let config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    let response = await axios.patch(`${backendServerBaseURL}/api/auth/user`, {
      action: 'update_email',
      email: payload.email,
      newEmail: payload.newEmail,
    }, config);

    if (response.status === 200 && response.data.status === 'ok') {
      thunkAPI.dispatch(getUserInfo())
      payload.reset()
    }

    if (response.status === 200 && response.data.status === 'error') {
      payload.setErrors({ afterSubmit: response.data.errors[0] })
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  'setting/updateUserPassword',
  async (payload, thunkAPI) => {
    const token = await localStorage.getItem("accessToken", "")

    let config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    let response = await axios.patch(`${backendServerBaseURL}/api/auth/user`, {
      action: 'update_password',
      password: payload.password,
      newPassword: payload.newPassword
    }, config);

    if (response.status === 200 && response.data.status === 'ok') {
      thunkAPI.dispatch(getUserInfo())
      payload.reset()
    }

    if (response.status === 200 && response.data.status === 'error') {
      payload.setErrors({ afterSubmit: response.data.errors[0] })
    }
  }
);

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  }
})

export const {
  updateUserInfo,
} = settingSlice.actions;

export const selectUserInfo = (state) => state.setting.userInfo;


export default settingSlice.reducer;
