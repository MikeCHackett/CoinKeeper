import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.styles.css';
import Logo from '../assets/coin.svg';
import { WelcomeMsg } from './WelcomeMsg';


export const Navbar = () => {

  const { currentUser, logout } = useAuth();

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    setError('')
    try {
      await logout();
      navigate('/login')
      console.log('Successful log out')
    } catch (e) {
      setError('Failed to log out')
      console.log(e.message)
    }
  }
  
  setTimeout (() => {
    setError(false)
  }, 5000)

  return (
    <nav className='nav-container'>
        <Link title='home' className='logo-wrapper' to='/'>
          <img className='logo-img' alt='logo' src={Logo} />
          <p className='logo'>Coin Keeper</p>
        </Link>

        <WelcomeMsg />


      <>

        {currentUser ? ( 
          <div className='nav-links-auth'>
            <Link title='dashboard' className='nav-links' to="/dashboard">Dashboard</Link>
            <Link title='expenses' className='nav-links' to="/expense-tracker">Expenses</Link>
            <button title='logout' className='logout-btn' onClick={handleLogout}>Logout</button>
          </div>
          ) : ( 
          <div className='nav-links-unauth'>
            <Link className='nav-links' to="/login">Login</Link>
            <Link className='nav-links' to="/signup">Sign Up</Link>
          </div>
        )}

        {error && <p className='signup-error'>{error}</p>}

      </>
    </nav>
  )
}


