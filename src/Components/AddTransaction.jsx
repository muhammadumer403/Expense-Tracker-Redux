// src/components/AddTransaction.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../store/transactionSlice';
import { v4 as uuid } from 'uuid';
import "../index.css"
const AddTransaction = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense'); // Default to expense
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (description.trim() && amount.trim()) {
      dispatch(
        addTransaction({
          id: uuid(),
          description,
          amount: parseInt(amount),
          type
        })
      );

      setDescription('');
      setAmount('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center flex-col'>
      <h3>Add New Transaction</h3>
  <div className='flex gap-5'>
  <div className='flex'>
        
        <input
          type="text"
          placeholder='Description....'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        
        <input
          type="number"
          value={amount}
          placeholder='Amount....'
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
  </div>
      <div className=''>
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default AddTransaction;
