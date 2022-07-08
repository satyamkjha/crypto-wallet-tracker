import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { backendServerBaseURL } from "../../utils/backendServerBaseURL";

const initialState = {
  currentPlan: 0,
  currentExchangerates: {},
  currentpriceInCrypto: 0,
};

export const getCurrentPlan = createAsyncThunk("pricing/getCurrentPlan", async (_, thunkAPI) => {
  const token = await localStorage.getItem("accessToken", "");

  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let response = await axios.get(`${backendServerBaseURL}/api/auth/plan`, config);

  if (response.status === 200) {
    thunkAPI.dispatch(updateCurrentPlan(response.data.data.plan));
  }
});

export const getCurrentExchangeRates = createAsyncThunk("pricing/getCurrentExchangeRates", async (_, thunkAPI) => {
  const token = await localStorage.getItem("accessToken", "");

  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let response = await axios.get(`${backendServerBaseURL}/api/auth/plan/exchange-rates`, config);

  if (response.status === 200) {
    thunkAPI.dispatch(updateCurrentExchangerates(response.data.data));
  }
});

export const calculatePriceInCrypto = createAsyncThunk("pricing/getCurrentExchangeRates", async (payload, thunkAPI) => {
  let calculatedCurrentpriceInCrypto = 0;
  const targetCrypt = payload.targetCrypt;

  const rate_btc = thunkAPI.getState().pricing.currentExchangerates["USD"]["rate_btc"];
  const calculatedCurrentpriceInBTC = rate_btc * thunkAPI.getState().dashboard.planStats.pricing[payload.updatingPlanTo].price;

  const target_rate_btc = thunkAPI.getState().pricing.currentExchangerates[targetCrypt]["rate_btc"];
  calculatedCurrentpriceInCrypto = calculatedCurrentpriceInBTC / target_rate_btc;

  thunkAPI.dispatch(updateCurrentpriceInCrypto(calculatedCurrentpriceInCrypto));
});

export const updatePlan = createAsyncThunk("pricing/updatePlan", async (payload, thunkAPI) => {
  const token = await localStorage.getItem("accessToken", "");

  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let response = await axios.patch(
    `${backendServerBaseURL}/api/auth/plan`,
    {
      targetPlan: payload.targetPlan,
      paymentGateway: "stripe",
    },
    config
  );

  if (response.status === 200) {
    window.open(response.data.data.redirect_url, "_self");
  }
});

export const updatePlanUsingCoinpayment = createAsyncThunk("pricing/updatePlanUsingCoinpayment", async (payload, thunkAPI) => {
  const token = await localStorage.getItem("accessToken", "");

  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let response = await axios.patch(
    `${backendServerBaseURL}/api/auth/plan`,
    {
      targetPlan: payload.targetPlan,
      paymentGateway: "coinpayment",
      currency: payload.targetCrypto,
    },
    config
  );

  if (response.status === 200) {
    window.open(response.data.data.redirect_url, "_self");
  }
});

export const pricingSlice = createSlice({
  name: "pricing",
  initialState,
  reducers: {
    updateCurrentPlan: (state, action) => {
      state.currentPlan = action.payload;
    },
    updateCurrentExchangerates: (state, action) => {
      state.currentExchangerates = action.payload;
    },
    updateCurrentpriceInCrypto: (state, action) => {
      state.currentpriceInCrypto = action.payload;
    },
  },
});

export const { updateCurrentPlan, updateCurrentExchangerates, updateCurrentpriceInCrypto } = pricingSlice.actions;

export const selectCurrentPlan = (state) => state.pricing.currentPlan;
export const selectCurrentExchangerates = (state) => state.pricing.currentExchangerates;
export const selectCurrentpriceInCrypto = (state) => state.pricing.currentpriceInCrypto;

export default pricingSlice.reducer;
