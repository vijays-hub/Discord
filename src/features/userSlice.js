import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null
    }
  },
});

export const { login, logout } = userSlice.actions;

// Selector : Like a Getter that gets the current state's user value.
export const selectUser = state => state.user.user;

export default userSlice.reducer;
