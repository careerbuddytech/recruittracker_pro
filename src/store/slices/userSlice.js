import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {
    id: 'user_001',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'administrator', // 'administrator' or 'teamMember'
    permissions: ['view_all_transactions', 'create_transactions', 'edit_transactions', 'approve_transactions']
  },
  isAuthenticated: true
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserRole: (state, action) => {
      state.currentUser.role = action.payload;
      // Update permissions based on role
      if (action.payload === 'administrator') {
        state.currentUser.permissions = [
          'view_all_transactions', 
          'create_transactions', 
          'edit_transactions', 
          'approve_transactions',
          'delete_transactions'
        ];
      } else {
        state.currentUser.permissions = ['view_own_transactions', 'create_transactions'];
      }
    },
    updateUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    }
  }
});

export const { setUserRole, updateUser, logout } = userSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectUserRole = (state) => state.user.currentUser?.role;
export const selectUserPermissions = (state) => state.user.currentUser?.permissions || [];
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

export default userSlice.reducer;