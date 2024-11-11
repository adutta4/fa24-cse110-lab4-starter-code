import { Database } from "sqlite";
import { createExpenseServer, deleteExpense, getExpensesServer } from "./expense-utils";
import { Request, Response } from 'express';

export function createExpenseEndpoints(app: any, db: Database) {
   // Create a new expense
   app.post("/expenses", (req: Request, res: Response) => {
       createExpenseServer(req, res, db);

   });

   // Delete an expense
   app.delete("/expenses/:id", (req: Request, res: Response) => {

       deleteExpense(req, res, db);

   });

   // Get all expenses
   app.get("/expenses", (req: Request, res: Response) => {

       getExpensesServer(req, res, db);

   });

}

