import React, { useState, useEffect } from 'react';
import '../styles/expenseform.styles.css'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { categoryData } from '../data/CategoryData';
import { nanoid } from 'nanoid';

export const ExpenseForm = () => {

  const [name, setName] = useState("");

  const [cost, setCost] = useState("");

  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);

  const [category, setCategory] = useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const { addExpense } = useAuth();

  const nameContainsNumber = /\d/.test(name);

  const newExpense = {
    id: nanoid(),
    name,
    cost: +cost,
    dueDate,
    category
  }

  const handleCreate = (e) => {
    e.preventDefault();
    if (nameContainsNumber) {
      setError("Please don't use numbers as names");
        setTimeout(() => {
          setError(false);
          setName('');
        }, 2000);
      return;
    }
    if (!name || !cost || !dueDate || !category) {
      setError("Please enter all required fields");
      setTimeout(() => {
        setError(false);
      }, 2000);
    return;
    }
    addExpense(newExpense);
    console.log(newExpense)
    setSuccess(true);
  }

  useEffect(() => {
    if (success) {
      const timeoutId = setTimeout(() => {
        navigate('/expense-tracker'); // redirect after 5 seconds
      }, 1000);

      return () => {
        clearTimeout(timeoutId); // clear timeout on unmount
      }
    }
  }, [success, navigate]);


  return (
    <div className='expense-form-container'>

      

        <form
          className='expense-form'
          onSubmit={handleCreate}
        >

          <h1 className='expense-form-header'>Create an expense</h1>
          
          <div className='expense-inputs'>
            <label htmlFor={name} className='expense-label'> Name
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='expense-input'
                placeholder='expense name'
                required
              />
            </label>

            <label className='expense-label'> Cost
              <input
                type='number'
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className='expense-input'
                placeholder='cost $$$'
                required
              />
            </label>
          </div>

          <div className='expense-inputs'>
            <label className='expense-label'> Due date
              <input
                type='date'
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className='expense-input'
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </label>

            <label className='expense-label'> Category
              <select className='expense-input' value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select</option>
                  {categoryData.map((category) => (
                    <option key={category.id} value={category.categoryName}>
                  {category.categoryName}
                </option>
                ))}
              </select>
            </label>
          </div>


          <button
          type='submit'
          className='expense-btn'
          >
            Add expense
          </button>

          {error && (
            <div className='expense-failure'>
              <p className='expense-failure-msg'>{error}</p>
            </div>
          )}

          {success && (
            <div className='expense-success'>
              <p className='expense-success-msg'>Expense created successfully!</p>
            </div>
          )}
        </form>
    </div>
  )
}