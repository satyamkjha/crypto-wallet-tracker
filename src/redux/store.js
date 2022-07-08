import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashboardSlice';
import investigationReducer from './slices/investigationSlice';
import pricingReducer from './slices/pricingSlice';
import settingReducer from './slices/settingSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    investigation: investigationReducer,
    pricing: pricingReducer,
    setting: settingReducer,
    notification: notificationReducer,
  },
});
