import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLastActivity } from '../redux/sessionSlice';
import { RootState } from '../redux/store';

const useSessionTimeout = () => {
  const dispatch = useDispatch();
  const { isSessionActive } = useSelector((state: RootState) => state.session);

  useEffect(() => {
    const handleActivity = () => {
      dispatch(updateLastActivity());
    };

    const activityEvents = ['mousemove', 'keydown', 'click'] as const;
    activityEvents.forEach((event) =>
      window.addEventListener(event, handleActivity)
    );

    const interval = setInterval(() => {
      if (!isSessionActive) {
        localStorage.removeItem('isAuthenticated');
        window.location.reload(); // Changed from redirect to reload for better state cleanup
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      activityEvents.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
      clearInterval(interval);
    };
  }, [dispatch, isSessionActive]);
};

export default useSessionTimeout;