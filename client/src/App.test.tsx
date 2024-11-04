import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { MyBudgetTracker } from './views/MyBudgetTracker';

describe("Create an Expense", () => {
  test("check ui for creating expenses", () => {
    render(<App />);
 
    const createExpenseSection = screen.getByText("Add Expense");
    const name = screen.getByText("Name");
    const cost = screen.getByText("Cost");
    const save = screen.getByText("Save");
    expect(createExpenseSection).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(save).toBeInTheDocument();
    expect(cost).toBeInTheDocument();
  });
 
  test("creates a new expense", () => {
    render(<App/>);

    const saveButton = screen.getByText("Save");

    const createExpenseName = screen.getByPlaceholderText("Enter item name");
    const createExpenseCost = screen.getByPlaceholderText("Enter item cost");
    fireEvent.change(createExpenseName, { target: { value: "Expense 1" } });
    fireEvent.change(createExpenseCost, { target: { value: "200" } });
    fireEvent.click(saveButton);

    const newExpenseName = screen.getByText("Expense 1");
    const newExpenseCost = screen.getByText("$200");

    expect(newExpenseCost).toBeInTheDocument();
    expect(newExpenseName).toBeInTheDocument();
  });

  test("Spent and remaining updated", () => {
    render(<App/>);

    const saveButton = screen.getByText("Save")
    const budgetRemaining = screen.getByText("Remaining: $1000");
    const budgetSpent = screen.getByText('Spent so far: $0')

    expect(budgetRemaining).toBeInTheDocument();
    expect(budgetSpent).toBeInTheDocument();

    const createExpenseName = screen.getByPlaceholderText("Enter item name");
    const createExpenseCost = screen.getByPlaceholderText("Enter item cost");
    fireEvent.change(createExpenseName, { target: { value: "Expense 1" } });
    fireEvent.change(createExpenseCost, { target: { value: "200" } });
    fireEvent.click(saveButton);

    const updatedSpent = screen.getByText('Spent so far: $200');
    const updatedRemaining = screen.getByText('Remaining: $800');

    expect(updatedSpent).toBeInTheDocument();
    expect(updatedRemaining).toBeInTheDocument();
  });
 });

 describe("Delete an expense", () => { 
  test("expense deleted on click", () => {
    render(<App/>);

    const saveButton = screen.getByText("Save");

    const createExpenseName = screen.getByPlaceholderText("Enter item name");
    const createExpenseCost = screen.getByPlaceholderText("Enter item cost");
    fireEvent.change(createExpenseName, { target: { value: "Expense 1" } });
    fireEvent.change(createExpenseCost, { target: { value: "200" } });
    fireEvent.click(saveButton);

    const newExpenseName = screen.getByText("Expense 1");
    const newExpenseCost = screen.getByText("$200");

    expect(newExpenseCost).toBeInTheDocument();
    expect(newExpenseName).toBeInTheDocument();

    const deleteExpenseButton = screen.getByText("x");
    fireEvent.click(deleteExpenseButton);
    expect(newExpenseCost).not.toBeInTheDocument();
    expect(newExpenseName).not.toBeInTheDocument();
  });

  test("Spent and remaining updated on delete", () => {
    render(<App/>);

    const saveButton = screen.getByText("Save")
    const budgetRemaining = screen.getByText("Remaining: $1000");
    const budgetSpent = screen.getByText('Spent so far: $0')

    expect(budgetRemaining).toBeInTheDocument();
    expect(budgetSpent).toBeInTheDocument();

    const createExpenseName = screen.getByPlaceholderText("Enter item name");
    const createExpenseCost = screen.getByPlaceholderText("Enter item cost");
    fireEvent.change(createExpenseName, { target: { value: "Expense 1" } });
    fireEvent.change(createExpenseCost, { target: { value: "200" } });
    fireEvent.click(saveButton);

    const updatedSpent = screen.getByText('Spent so far: $200');
    const updatedRemaining = screen.getByText('Remaining: $800');

    expect(updatedSpent).toBeInTheDocument();
    expect(updatedRemaining).toBeInTheDocument();

    const deleteExpenseButton = screen.getByText("x");
    fireEvent.click(deleteExpenseButton);

    expect(budgetRemaining).toBeInTheDocument();
    expect(budgetSpent).toBeInTheDocument();
  });
 });

 describe("Budget Balance Verification", () => {
  test("check balance = remaining + spent", () => {
    render(<App />);
 
    const saveButton = screen.getByText("Save")
    const budgetRemaining = screen.getByText("Remaining: $1000");
    const budgetSpent = screen.getByText('Spent so far: $0')

    expect(budgetRemaining).toBeInTheDocument();
    expect(budgetSpent).toBeInTheDocument();

    const createExpenseName = screen.getByPlaceholderText("Enter item name");
    const createExpenseCost = screen.getByPlaceholderText("Enter item cost");
    fireEvent.change(createExpenseName, { target: { value: "Expense 1" } });
    fireEvent.change(createExpenseCost, { target: { value: "400" } });
    fireEvent.click(saveButton);

    fireEvent.change(createExpenseName, { target: { value: "Expense 2" } });
    fireEvent.change(createExpenseCost, { target: { value: "100" } });
    fireEvent.click(saveButton);

    fireEvent.change(createExpenseName, { target: { value: "Expense 3" } });
    fireEvent.change(createExpenseCost, { target: { value: "200" } });
    fireEvent.click(saveButton);

    const expense1 = screen.getByText("Expense 1");
    const expense2 = screen.getByText("Expense 2");
    const expense3 = screen.getByText("Expense 3");
    expect(expense1).toBeInTheDocument();
    expect(expense2).toBeInTheDocument();
    expect(expense3).toBeInTheDocument();

    const newRemaining = screen.getByText("Remaining: $300");
    const newSpent = screen.getByText('Spent so far: $700');

    expect(newRemaining).toBeInTheDocument();
    expect(newSpent).toBeInTheDocument();

    const [deleteExpenseButton, ...deleteButtons]= screen.getAllByText("x");
    fireEvent.click(deleteExpenseButton);

    const expectedNewSpent = screen.getByText("Remaining: $700");
    const expectedNewRemaining = screen.getByText("Spent so far: $300")
    const expectBudget = screen.getByText("Budget: 1000")

    expect(expectedNewSpent).toBeInTheDocument();
    expect(expectedNewRemaining).toBeInTheDocument();
  });
 });
 
