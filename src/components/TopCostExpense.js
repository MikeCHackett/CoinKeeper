import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/dashboard.styles.css';
import { NoExpenseMsg } from './NoExpenseMsg';

export const TopCostExpense = () => {

    const { expenses } = useAuth();

    // Find the most expensive expense
    const mostExpensiveExpense = expenses.reduce((prevExpense, currentExpense) => {
        if (!prevExpense || !prevExpense.cost || prevExpense.cost < currentExpense.cost) {
        return currentExpense;
        } else {
        return prevExpense;
        }
    }, null);

  return (


          <div className='category-expenses'>
            <h2 className='cat-exp-title'>Most expensive expense:</h2>
            {expenses.length > 0 ? (
              <div className='cat-exp-container'>
                <p className='cat-exp-info'>{mostExpensiveExpense.name}</p>
                <p className='cat-exp-info'>${mostExpensiveExpense.cost}</p>
              </div>
            ) : (
              <NoExpenseMsg title='No expenses created.' />
            )}
          </div>
      
    
  )
}
