import { createSlice } from "@reduxjs/toolkit";

// Initial state for profile
const initialState = {
  name : "",
  email: "",
  phone: "",
};

// Create the profile slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // Action to set the profile data
    setProfile: (state, action) => {
      state.name  = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
    },
    // Action to update the profile name
    updateName: (state, action) => {
      state.name = action.payload;
    },
    // Action to update the profile email
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    // Action to update the profile phone number
    updatePhone: (state, action) => {
      state.phone = action.payload;
    },
  },
});

// Export actions
export const { setProfile, updateName, updateEmail, updatePhone } = profileSlice.actions;

// Export the reducer
export default profileSlice.reducer;