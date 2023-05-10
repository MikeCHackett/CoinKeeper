import React, { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import '../styles/dashboard.styles.css';
import { CategoryExpenses } from '../components/CategoryExpenses';
import { NextExpenseDue } from '../components/NextExpenseDue';
import { TopCostExpense } from '../components/TopCostExpense';
import { Top5Expenses } from '../components/Top5Expenses';

export const Dashboard = () => {

  const [loading, setLoading] = useState(true);

  // sets the loading function
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3000);

    setLoading(true);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>

      {loading ? (

        <Loader />

        ) : (

        <div className='dashboard-container'>

          <div className='category-container'>

            <CategoryExpenses />

          </div>
          
          <div className='dashboard-containers'>

            <NextExpenseDue />

            <TopCostExpense />
            
            <Top5Expenses />

          </div>

        </div>
      )}
    </>
  );
};
