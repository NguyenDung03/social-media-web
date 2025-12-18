import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    // suggestedUsers đã chuyển sang TanStack Query
    // Server state không nên lưu trong Redux
    userProfile: null,
    selectedUser: null,
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});
export const { setUserProfile, setSelectedUser } = authSlice.actions;
export default authSlice.reducer;
