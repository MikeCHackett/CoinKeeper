import React, { useState } from 'react';
import { NoExpenseMsg } from './NoExpenseMsg';
import { useAuth } from '../context/AuthContext';
import { Category } from './Category';
import '../styles/dashboard.styles.css';

export const CategoryExpenses = () => {

    const { expenses } = useAuth();

    const [selectedCategory, setSelectedCategory] = useState(null);

    // filters expenses based on category and sorts them by creation date
    const filteredExpenses = selectedCategory
        ? expenses.filter(expense => expense.category === selectedCategory).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)
        : expenses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

    // handles the user change of category selection
    const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    };

  return (
    <>
            <Category onSelect={handleCategoryChange} />
                    <div className='category-expenses'>
                        <h2 title="category related expenses" className='cat-exp-title'>Category related expenses:</h2>
                            {filteredExpenses.length > 0 ? (
                                filteredExpenses.map((expense) => (
                                    <div className='cat-exp-container' key={expense.id}>
                                        <p className='cat-exp-info'>{expense.name}</p>
                                        <p className='cat-exp-info'>${expense.cost}</p>
                                        <p className='cat-exp-info'>{expense.dueDate}</p>
                                    </div>
                                    ))
                                ) : (
                            <NoExpenseMsg title='No expense created for this category.' />
                        )
                    }
                </div>
    </>
  )
}
