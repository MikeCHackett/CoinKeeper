import React from 'react';
import '../styles/dashboard.styles.css';

export const NoExpenseMsg = ({ title }) => {
  return (
    <>
      <p className='cat-exp-info'>{title}</p>
    </>
  )
}
