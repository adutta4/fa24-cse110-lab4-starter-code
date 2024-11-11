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
    const {id}  = req.params;
    try {
        const expense = await db.get('SELECT * FROM expenses WHERE id = ?', [id]);

        if (!expense) {
            return res.status(404).send({ error: `Expense with id ${id} not found` });
        }
        await db.run('DELETE FROM expenses WHERE id = ?', [id]);
    }
    catch (error){
        return res.status(400).send({ error: `Expense could not be deleted, + ${error}` });
    }

    res.status(201).send(id);
}

export async function getExpensesServer(req: Request, res: Response, db: Database) {
    try {
      const expenses = await db.all("SELECT * FROM expenses");

      res.status(200).json({ data: expenses});
    } catch (error) {
      res.status(400).json({ error: `Error getting expenses: ${error}` });
    }
  }