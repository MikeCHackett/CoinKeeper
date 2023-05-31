import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import '../styles/landingpage.styles.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { RiUserFollowLine } from 'react-icons/ri';
import { TfiFiles, TfiTimer } from 'react-icons/tfi';
import LandingImage from '../assets/budget.jpg';
import Logo from '../assets/coin.svg';

export const LandingPage = () => {

  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 2000);

        setLoading(true);

        return () => clearTimeout(timeoutId);
    }, []);

  const handleGetStarted = () => {
    if (currentUser) {
      navigate ('/expense-tracker');
    } else {
      navigate ('/signup');
    }
  } 

  return (
    <>
      {
        loading ? <Loader /> :

        <div className='landing-container'>
          <div className='header-container'>
            <div className='header-left'>
              <h1 className='landing-header'>Coin Keeper<span><img className='logo-img-landing' alt='logo' src={Logo} /></span></h1>
              <p className='description'>Keep track of your expenses with ease.</p>
              <button title='Get Started now!' className='landing-btn' onClick={handleGetStarted}>Get started</button>
            </div>
            <img className='header-right' src={LandingImage} alt='Budget Buddy' />
          </div>
          <div className='info-container'>
            <h3 className='key-benefits'>Key Benefits</h3>
              <Card
                icon={<RiUserFollowLine size={35} />}
                title='Easy-to-use interface'
                info='Our simple, user-friendly design makes tracking your finances with Budget-Buddy a breeze.' />
              <Card
                icon={<TfiFiles size={35} />}
                title='Expense categories'
                info="Keep your spending habits transparent with Budget-Buddy's expense categories." />
              <Card
                icon={<TfiTimer size={35} />}
                title='Real-time tracking'
                info='With Budget-Buddy, real-time tracking features keep you updated at all times.' />
          </div>
        </div>
      }
    </>
  )
}