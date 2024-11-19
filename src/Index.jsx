// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './store/transactionSlice';

// Helper function to load from localStorage
const loadFromLocalStorage = () => {
  const savedTransactions = localStorage.getItem('transactions');
  if (savedTransactions) {
    return JSON.parse(savedTransactions);
  }
  return {
    expenses: [],
    income: []
  };
};

// Save to localStorage whenever transactions change
const saveToLocalStorage = (state) => {
  localStorage.setItem('transactions', JSON.stringify(state));
};

// Create store with localStorage data
export const store = configureStore({
  reducer: {
    transactions: transactionReducer
  },
  preloadedState: loadFromLocalStorage()
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveToLocalStorage(store.getState().transactions);
});


