import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import '../styles/login.styles.css';

export const Login = () => {

    const [error, setError] = useState();

    const emailRef = useRef();

    const passwordRef = useRef();

    const { signIn } = useAuth();

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            setError('')
            await signIn(emailRef.current.value, passwordRef.current.value)
            console.log('Successful Login')
            navigate('/')
        } catch (e) {
            setError('Cannot login')
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
                    <div className='login-container'>
                        
                        <form
                        onSubmit={handleSignIn}
                        className='form'
                        >
                            <h1 className='header'>Login</h1>

                            <input
                            type='email'
                            placeholder='Enter Email'
                            ref={emailRef}
                            required
                            />

                            <input
                            type='password'
                            placeholder='Enter Password'
                            ref={passwordRef}
                            required                
                            />

                            <button
                            type='submit'
                            className='login-btn'
                            >
                                Login
                            </button>

                            {error && <h1 className='login-error'>{error}</h1>}

                            <Link className='signup-link' to='/forgot-password'>Forgot password?</Link>

                            <p className='to-signup-btn'>Not registered? <Link className='signup-link' to='/signup'>Register Here</Link></p>

                        </form>

                    </div>
                }
            </>      
    )
}