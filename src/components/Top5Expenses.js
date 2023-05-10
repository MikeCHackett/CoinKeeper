import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/dashboard.styles.css';
import { NoExpenseMsg } from './NoExpenseMsg';

export const Top5Expenses = () => {
  const { expenses } = useAuth();

  const [showHighestCost, setShowHighestCost] = useState(true);
  const [dueButtonActive, setDueButtonActive] = useState(false);
  const [showHighestDue, setShowHighestDue] = useState([]);

  const HighestCost =
    expenses.length > 0
      ? expenses.sort((a, b) => b.cost - a.cost).slice(0, 5)
      : [];

  const HighestDue =
    expenses.length > 0
      ? expenses
          .sort((a, b) => b.dueDate - a.dueDate)
          .slice(0, 5)
          .map((expense) => ({
            name: expense.name,
            dueDate: expense.dueDate,
          }))
      : [];

  const handleDueClick = () => {
    if (expenses.length > 0) {
      setShowHighestCost(false);
      setShowHighestDue(HighestDue);
      setDueButtonActive(true);
    } else {
      setShowHighestDue([]);
      setDueButtonActive(false);
    }
  };

  useEffect(() => {
    if (showHighestCost) {
      setDueButtonActive(false);
    }
  }, [showHighestCost]);

  return (
    <div className="category-expenses">
      <h2 className="cat-exp-title">Top 5 expenses:</h2>
      {expenses.length > 0 && (
        <div className="top-expenses-buttons">
          <button
            className={`top-expenses-btn ${
              showHighestCost ? 'top-expenses-btn-active' : ''
            }`}
            onClick={() => {
              setShowHighestCost(true);
              setShowHighestDue([]);
            }}
          >
            Cost
          </button>
          <button
            className={`top-expenses-btn ${
              showHighestDue.length > 0 || dueButtonActive
                ? 'top-expenses-btn-active'
                : ''
            }`}
            onClick={handleDueClick}
          >
            Due
          </button>
        </div>
      )}

      {showHighestDue.length > 0 && (
        <div className="top-expenses">
          {showHighestDue.map((expense) => (
            <div className="cat-exp-container" key={expense.name}>
              <p className="cat-exp-info">{expense.name}</p>
              <p className="cat-exp-info">{expense.dueDate}</p>
            </div>
          ))}
        </div>
      )}

      {showHighestCost && (
        <div className="top-expenses">
          {HighestCost.length > 0 ? (
            HighestCost.map((expense) => (
              <div className="cat-exp-container" key={expense.id}>
                <p className="cat-exp-info">{expense.name}</p>
                <p className="cat-exp-info">${expense.cost}</p>
              </div>
            ))
          ) : (
            <NoExpenseMsg title="No expenses created." />
          )}
        </div>
      )}
    </div>
  );
};
