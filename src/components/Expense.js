import React from "react";
import { useAuth } from "../context/AuthContext";
import '../styles/expense.styles.css';
import { SlTag } from 'react-icons/sl';
import { TfiMoney, TfiTrash } from 'react-icons/tfi';
import { BsCalendar2Date } from 'react-icons/bs';
import { BiCategoryAlt } from 'react-icons/bi';

export const Expense = ({ id, name, cost, dueDate, category }) => {

  const { deleteExpense } = useAuth();

  const handleDelete = () => {
    deleteExpense(id);
  }

  return (
    <div className="expense-container">
      <div className="expense expense-item-wrapper">
        <SlTag size={20} />
        <p className="expense-name">name:</p>
        <p className="expense-item">{name}</p>
      </div>
      <div className="expense expense-item-wrapper">
        <TfiMoney size={20} />
        <p className="expense-name">cost:</p>
        <p className="expense-item">{cost}</p>
      </div>
      <div className="expense expense-item-wrapper">
        <BsCalendar2Date size={20} />
        <p className="expense-name">due date:</p>
        <p className="expense-item">{dueDate}</p>
      </div>
      <div className="expense expense-item-wrapper">
        <BiCategoryAlt size={20} />
        <p className="expense-name">Category:</p>
        <p className="expense-item">{category}</p>
      </div>
      <button className="expense-delete-btn" onClick={handleDelete}>Delete<span><TfiTrash size={18} /></span></button>
    </div>
  );
};