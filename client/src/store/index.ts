import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user.slices";
const RootReducer = combineReducers({
    user: userSlice.reducer,
});

export const store = configureStore({
    reducer: RootReducer,
});

export type RootState = ReturnType<typeof RootReducer>;
export type AppDispatch = typeof store.dispatch;