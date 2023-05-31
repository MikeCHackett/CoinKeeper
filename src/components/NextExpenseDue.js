import React from 'react';
import { NoExpenseMsg } from './NoExpenseMsg';
import { useAuth } from '../context/AuthContext';
import '../styles/dashboard.styles.css';

export const NextExpenseDue = () => {

  const { expenses } = useAuth();

  // Sort expenses by due date in ascending order
  const sortedExpenses = expenses.sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );

  // Create an array to store expenses due on the same day
  let nextExpenses = [];
  
  // Loop through the sorted expenses array
  for (let i = 0; i < sortedExpenses.length; i++) {
    // Check if there are expenses due on the same day
    if (
      i < sortedExpenses.length - 1 &&
      sortedExpenses[i].dueDate === sortedExpenses[i + 1].dueDate
    ) {
      // Add the expense to the nextExpenses array
      nextExpenses.push(sortedExpenses[i]);
    } else {
      // Add the current expense to the nextExpenses array
      nextExpenses.push(sortedExpenses[i]);

      // Check if there are more expenses due on the same day
      for (let j = i + 1; j < sortedExpenses.length; j++) {
        if (sortedExpenses[j].dueDate === sortedExpenses[i].dueDate) {
          // Add the expense to the nextExpenses array
          nextExpenses.push(sortedExpenses[j]);
        } else {
          break;
        }
      }

      // Break out of the loop once we have found the next expenses due
      break;
    }

    // Check if we have already pushed 5 expenses to the array
    if (nextExpenses.length >= 5) {
      break;
    }
  }

  return (
    <div title="next expense due" className='category-expenses'>
      <h2 className='cat-exp-title'>Next expense due:</h2>
        {nextExpenses.length > 0 ? (
            <div className='top-expenses'>
                {nextExpenses.map((expense) => (
                    <div className='cat-exp-container' key={expense.id}>
                        <p className='cat-exp-info'>{expense.name}</p>
                        <p className='cat-exp-info'>{expense.dueDate}</p>
                    </div>
                ))}
            </div>
        ) 
        : 
        (
            <NoExpenseMsg title='No expenses created.' />
        )}
    </div>
  );
};
