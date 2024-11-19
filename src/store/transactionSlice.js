import { createSlice } from '@reduxjs/toolkit';

// Load transactions from localStorage
const loadTransactions = () => {
  const savedTransactions = localStorage.getItem('transactions');
  if (savedTransactions) {
    return JSON.parse(savedTransactions);
  }
  return { income: [], expenses: [] };
};

const initialState = loadTransactions();

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const { type, description, amount } = action.payload;
      const newTransaction = { id: Date.now(), description, amount: parseFloat(amount) };

      if (type === 'income') {
        state.income.push(newTransaction);
      } else {
        state.expenses.push(newTransaction);
      }

      saveToLocalStorage(state);
    },
    deleteTransaction: (state, action) => {
      const { id, type } = action.payload;
      if (type === 'income') {
        state.income = state.income.filter((transaction) => transaction.id !== id);
      } else {
        state.expenses = state.expenses.filter((transaction) => transaction.id !== id);
      }

      saveToLocalStorage(state);
    },
    editTransaction: (state, action) => {
      const { id, type, description, amount } = action.payload;
      let updatedList = type === 'income' ? state.income : state.expenses;

      const index = updatedList.findIndex((transaction) => transaction.id === id);
      if (index !== -1) {
        updatedList[index] = { ...updatedList[index], description, amount: parseFloat(amount) };
      }

      saveToLocalStorage(state);
    },
  },
});

// Function to save state to localStorage
const saveToLocalStorage = (state) => {
  localStorage.setItem('transactions', JSON.stringify(state));
};

export const { addTransaction, deleteTransaction, editTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
