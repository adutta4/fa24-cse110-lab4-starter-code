import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { createExpense } from "../../utils/expense-utils";

const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  const { expenses, setExpenses, budget, setBudget } = useContext(AppContext);
  // Exercise: Create name and cost to state variables
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Exercise: Add new expense to expenses context array
    let newExpense = {
      id: name,
      description: name,
      cost: parseInt(cost),
    }

    createExpense(newExpense);
    setExpenses([...expenses, newExpense])
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter item name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            placeholder='Enter item cost'
            value={cost}
            onChange={(event) => setCost(event.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
