import { Request, Response } from "express";
export class TodosController
{
    //* DI (dependency injection)
    constructor()
    {

    }

    public getTodos=(req:Request, res:Response) => {
        res.json([
            { id: 1, text: 'buy milk', createdAt: new Date() },
            { id: 2, text: 'buy bread', createdAt: new Date() },
        ]);
    }
}