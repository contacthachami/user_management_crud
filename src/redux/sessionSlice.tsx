import { createSlice,  } from '@reduxjs/toolkit';

interface SessionState {
  isSessionActive: boolean;
  lastActivity: number;
}

const initialState: SessionState = {
  isSessionActive: true,
  lastActivity: Date.now(),
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    updateLastActivity: (state) => {
      state.lastActivity = Date.now();
    },
    endSession: (state) => {
      state.isSessionActive = false;
    },
    resetSession: (state) => {
      state.isSessionActive = true;
      state.lastActivity = Date.now();
    },
  },
});

export const { updateLastActivity, endSession, resetSession } = sessionSlice.actions;
export default sessionSlice.reducer;
