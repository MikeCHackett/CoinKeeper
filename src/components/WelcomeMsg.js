import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/dashboard.styles.css';

export const WelcomeMsg = () => {

  const { currentUser } = useAuth();

  return (
    <div title='welcome' className='welcome-container'>
      {currentUser ? (
        <p className='welcome-msg'>
          Welcome...{' '}
          <span className='welcome-name'>{currentUser.email}</span>
        </p>
      ) : null}
    </div>
  );
};
