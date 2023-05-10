import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import '../styles/resetpassword.styles.css'

export const ForgotPassword = () => {

  const [error, setError] = useState();

  const [message, setMessage] = useState();

  const emailRef = useRef();

  const { resetPassword } = useAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setError('')
      await resetPassword(emailRef.current.value)
      setMessage('Check your email for a password reset link')
      navigate('/login')
    } catch (e) {
      setError('Password reset failed')
      console.log(e.message)
    }
  };

  useEffect (() => {
    const timeoutId = setTimeout(() => {
        setError(false);
    }, 5000);
    // cleanup function to clear timout on component re-render
    return () => clearTimeout(timeoutId);
}, [setError]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
        setLoading(false);
    }, 2500);

    setLoading(true);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
            { 
                loading ? <Loader /> :
                  <div className='forgotpassword-container'>

                    <form
                      className='form'
                      onSubmit={handleResetPassword}
                    >

                      <h1 className='header'>Reset Password</h1>

                      <input 
                        type='email'
                        ref={emailRef}
                        placeholder='Enter Email'
                        required
                      />

                      <button
                        type='submit'
                        className='reset-btn'
                      >
                        Reset Password
                      </button>

                      {error && <p className='reset-password-error'>{error}</p>}

                      {message && <p className='reset-password-message'>{message}</p>}

                      <Link className='login-link' to='/login'>Login?</Link>

                      <p className='to-signup-btn'>Not registered?<Link className='signup-link' to='/signup'> Sign up</Link></p>

                    </form>

                  </div>
            }
      </>
  )
}
