import { Database } from "sqlite";
import { Expense } from "../types";
import { Request, Response } from "express";

export async function createExpenseServer(req: Request, res: Response, db: Database) {

    try {
        // Type casting the request body to the expected format.
        const { id, cost, description } = req.body as { id: string, cost: number, description: string };
 
        if (!description || !id || !cost) {
            return res.status(400).send({ error: "Missing required fields" });
        }
 
        await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
        res.status(201).send({ id, description, cost });
 
    } catch (error) {
 
        return res.status(400).send({ error: `Expense could not be created, + ${error}` });
    };
 
 } 

export async function deleteExpense(req: Request, res: Response, db: Database) {
    // const currLen = expenses.length;
    const {id}  = req.params;

    // const expenseInd = expenses.findIndex((expense) => expense.id === id);
    // expenses.splice(expenseInd, 1);

    res.status(201).send(id);
}

export async function getExpensesServer(req: Request, res: Response, db: Database) {
    try {

        let query = 'SELECT * FROM expenses'; // Basic SQL query to get all expenses
        let queryParams: any[] = [];

        const rows = await db.all(query, queryParams);

        if (rows.length === 0) {
            return res.status(404).send({ message: 'No expenses found' });
        }

        res.status(200).send(rows);

    } catch (error) {
        // Return an error if something goes wrong
        return res.status(500).send({ error: `Error fetching expenses: ${error}` });
    }
}