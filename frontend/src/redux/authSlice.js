import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    suggestedUsers: [],
    userProfile: null,
    selectedUser: null,
  },
  reducers: {
    setSuggestedUsers: (state, action) => {
      state.suggestedUsers = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});
export const { setSuggestedUsers, setUserProfile, setSelectedUser } =
  authSlice.actions;
export default authSlice.reducer;
