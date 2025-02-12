import { Middleware } from 'redux';
import { RootState } from './store';

export const sessionMiddleware: Middleware<{}, RootState> = store => next => action => {
  const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds
  const state = store.getState();
  const currentTime = Date.now();

  if (
    state.session.isSessionActive &&
    currentTime - state.session.lastActivity > SESSION_TIMEOUT
  ) {
    store.dispatch({ type: 'session/endSession' });
  }

  return next(action);
};
