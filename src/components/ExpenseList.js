import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Expense } from './Expense';
import '../styles/expense.styles.css';


export const ExpenseList = () => {

  const { expenses } = useAuth();

  return (
    <>
      <ul className='expense-list'>
        {expenses.map((expense) => (
          <Expense
            key={expense.id}
            id={expense.id}
            name={expense.name}
            cost={expense.cost}
            dueDate={expense.dueDate}
            category={expense.category}
            />
        ))}
      </ul>
    </>
  )
}