// src/components/EditTransaction.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editTransaction } from "../store/transactionSlice";
import "../index.css";

const EditTransaction = ({ transaction, closeEditMode, type }) => {
  const [description, setDescription] = useState(transaction.description);
  const [amount, setAmount] = useState(transaction.amount);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      editTransaction({
        id: transaction.id,
        type,
        description,
        
          amount: parseFloat(amount),
        
      })
    );

    closeEditMode();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Transaction</h3>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button type="submit">Save Changes</button>
      <button type="button" onClick={closeEditMode}>
        Cancel
      </button>
    </form>
  );
};

export default EditTransaction;
