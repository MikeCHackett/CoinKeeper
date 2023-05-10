import React, { useState, useEffect } from 'react';
import { Loader } from '../components/Loader';
import { ExpenseForm } from '../components/ExpenseForm';

export const CreateExpense = () => {

  const [loading, setLoading] = useState(true);

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
        loading 
          ? 
          <Loader /> 
          :
        <ExpenseForm expense={{ name: '', cost: '', dueDate: '', category: '', id: null }} />
      }
    </>
  )
}
