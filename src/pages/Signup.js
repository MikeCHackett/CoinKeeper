import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { Loader } from '../components/Loader';
import '../styles/signup.styles.css';

export const Signup = () => {

    const [error, setError] = useState();

    const emailRef = useRef();

    const passwordRef = useRef();

    const passwordConfirmedRef = useRef();

    const usernameRef = useRef();

    const { createUser } = useAuth();

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
      e.preventDefault();
      if (passwordRef.current.value !== passwordConfirmedRef.current.value) {
        e.target.reset();
        return setError('Passwords do not match')
      }
      try {
        setError('')
        await createUser(emailRef.current.value, passwordRef.current.value, usernameRef.current.value)
        console.log("Successfully registered");
        navigate("/");
      } catch (err) {
        setError("Failed to register");
        console.log(err.message);
      }
    };

    useEffect (() => {
        const timeoutId = setTimeout (() => {
            setError(false);
        }, 5000);

        return () => {
            clearTimeout(timeoutId);
        };
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
                  <div className="signup-container">

                      <form
                      className="form"
                      onSubmit={handleSignUp}
                      >
                        <h1 className="header">Sign up</h1>

                          <input
                          type='email'
                          placeholder="Enter Email"
                          ref={emailRef}
                          required
                          />

                          <input
                          type='password'
                          placeholder="Enter Password"
                          ref={passwordRef}
                          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                          title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
                          required
                          />

                          <input
                          type='password'
                          placeholder="Confirm Password"
                          ref={passwordConfirmedRef}
                          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                          title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
                          required
                          />

                          <input
                          type="text"
                          placeholder="Create Username"
                          ref={usernameRef}
                          required
                          />

                          <button
                          className="register-btn"
                          type="submit"
                          >
                              Register Account
                          </button>

                          {error && <h1 className="signup-error">{error}</h1>}

                          <p className="to-login-btn">Already Registered?<Link className="login-link" to='/login'> Login</Link></p>

                      </form>

                  </div>
              }
          </>
    )
}