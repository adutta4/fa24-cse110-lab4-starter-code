import { Response } from 'express';

// Function to get the budget
export function getBudget(res: Response, budget: number) {
    res.status(200).send({ "data": budget });
}

// Function to update the budget
export function updateBudget(res: Response, body: any, budget: { amount: number }) {
    console.log("body in update: " + body.budget)
    const updatedBudget = parseInt(body.budget) 
    budget.amount = updatedBudget;
    res.status(200).send({"data": budget});
}
