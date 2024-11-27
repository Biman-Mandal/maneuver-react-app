import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  value: 0,
};

// Slice
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1; // Directly mutate state (handled internally by Immer)
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

// Export actions
export const { increment, decrement, reset } = counterSlice.actions;

// Export reducer
export default counterSlice.reducer;
