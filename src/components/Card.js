import React from 'react';
import '../styles/card.styles.css';

export default function Card({ title, info, icon }) {
  return (
    <div className='card-container'>
      <div className='card'>
        <span className='icon'>{icon}</span>
          <div className='card-body'>
            <h4 className='card-title'>{title}</h4>
            <p className='card-info'>{info}</p>
        </div>
      </div>
    </div>
  )
}
