import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const SESSION_DURATION = 15 * 60 * 1000; // 15 minutes inactivity timeout

const SessionManager = () => {
  const { authToken, logout } = useAuth();
  const logoutTimer = useRef(null);

  const resetTimer = () => {
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
    }
    logoutTimer.current = setTimeout(() => {
      logout();
    }, SESSION_DURATION);
  };

  useEffect(() => {
    if (!authToken) return;

    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    const handleActivity = () => {
      resetTimer();
    };

    events.forEach((event) => window.addEventListener(event, handleActivity));
    resetTimer(); // Start initial timer

    return () => {
      events.forEach((event) => window.removeEventListener(event, handleActivity));
      clearTimeout(logoutTimer.current);
    };
  }, [authToken]);

  return null; // This component doesn't render anything
};

export default SessionManager;
