import React from 'react';
import { SiGithub, SiLinkedin, SiTwitter, SiFiverr } from 'react-icons/si';
import { TfiEmail } from 'react-icons/tfi';
import '../styles/footer.styles.css';

export const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='footer-links'>
        <p className='info'>Created by Michael Hackett</p>
        <a className='info' href='https://github.com/MikeCHackett' target='_blank'><SiGithub /></a>
        <a className='info' href='https://www.linkedin.com/in/mikehackettlink/' target='_blank'><SiLinkedin /></a>
        <a className='info' href='https://twitter.com/xMikeTech' target='_blank'><SiTwitter /></a>
        <a className='info' href='https://www.fiverr.com/mhackett9/create-a-professional-website-for-your-business' target='_blank'><SiFiverr /></a>
        <a className='info' href='mailto:mchackett96@gmail.com' target='_blank'><TfiEmail /></a>
      </div>
    </div>
  )
}