// src/App.js
import React from 'react';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import "./index.css"

const App = () => {
  return (
    <div className="container w-[90vw] h-screen flex flex-col items-center justify-center ">
      <h1 className='text-4xl'>Expense & Income Tracker</h1>
      <AddTransaction />
      <TransactionList />
    </div>
  );
};

export default App;
