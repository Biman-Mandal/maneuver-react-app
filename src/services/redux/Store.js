import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./CounterReducer";
import profileReducer from "./ProfileReducer";
import { userAuthApi } from '../apis/UserAuth'; // Adjust the path as necessary

const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    counter: counterReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware),
});

export default store;
