// src/components/TransactionList.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTransaction, editTransaction } from '../store/transactionSlice';
import EditTransaction from './EditTransaction';
import "../index.css"

const TransactionList = () => {
  const transactions = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  const [editingTransaction, setEditingTransaction] = useState(null);

  const calculateBalance = () => {
    const totalIncome = transactions.income.reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalExpenses = transactions.expenses.reduce((acc, transaction) => acc + transaction.amount, 0);
    return totalIncome - totalExpenses;
  };

  const balance = calculateBalance();

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center justify-center'><h3>Transactions</h3>
      <h3>Balance: ${balance.toFixed(2)}</h3></div>
      {/* Expenses */}
      <div className='flex gap-32'>
      <div>
      <h4>Expenses</h4>
      <ul>
        {transactions.expenses.map((transaction) => (
          <li key={transaction.id}>
            {editingTransaction?.id === transaction.id ? (
              <EditTransaction
                transaction={transaction}
                closeEditMode={() => setEditingTransaction(null)}
                type="expense"
              />
            ) : (
              <>
                <span>{transaction.description}</span>
                <span>${transaction.amount}</span>
                <button onClick={() => setEditingTransaction(transaction)}>Edit</button>
                <button
                  onClick={() => dispatch(deleteTransaction({ id: transaction.id, type: 'expense' }))}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      </div>

      {/* Income */}
      <div><h4>Income</h4>
      <ul>
        {transactions.income.map((transaction) => (
          <li key={transaction.id}>
            {editingTransaction?.id === transaction.id ? (
              <EditTransaction
                transaction={transaction}
                closeEditMode={() => setEditingTransaction(null)}
                type="income"
              />
            ) : (
              <>
                <span>{transaction.description}</span>
                <span>${transaction.amount}</span>
                <button onClick={() => setEditingTransaction(transaction)}>Edit</button>
                <button
                  onClick={() => dispatch(deleteTransaction({ id: transaction.id, type: 'income' }))}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul></div>
      </div>
    </div>
  );
};

export default TransactionList;
