import React, { useEffect, useState } from 'react';
import '../styles/expense.styles.css';
import { Link } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import { ExpenseList } from '../components/ExpenseList';
import { NoExpenses } from '../components/NoExpenses';

export const ExpenseTracker = () => {

  const [loading, setLoading] = useState(true);

  const { expenses } = useAuth();

  useEffect(() => {
      const timeoutId = setTimeout(() => {
          setLoading(false);
      }, 1000);

      setLoading(true);

      return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      { 
        loading ? <Loader /> :
          <div className='expense-tracker-container'>
            <div className='expense-header-wrapper'>
            <h2 title='expenses page' className='expense-header'>My expenses</h2>
            </div>


              {expenses && expenses.length > 0 ? <div className='expense-wrapper'> <ExpenseList /> </div> : <NoExpenses />}

            <div className='expense-btn-wrapper'>
              <Link title='create an expense' className='create-expense-btn' to='/create-expenseform'>Create an expense</Link>
            </div>
          </div>
      }
    </>
  )
}
