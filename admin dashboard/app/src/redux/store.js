import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import authReducer from "./features/AuthenticationSlice";
import usersReducer from "./features/UsersSlice";
import roomsReducer from "./features/RoomsSlice";
import reservationsReducer from "./features/ReservationsSlice";
import reportsReducer from "./features/ReportsSlice";
import dashboardReducer from "./features/DashboardSlice";
const reducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  rooms: roomsReducer,
  reservations: reservationsReducer,
  reports: reportsReducer,
  dashboard: dashboardReducer,
});
const persistConfig = {
  key: "root",
  storage,
  safelist: ["auth"],
  blocklist: ["users", "rooms", "reservations"],
};
const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
