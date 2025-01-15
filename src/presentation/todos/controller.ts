import { Request, Response } from "express";
const todos = [
    { id: 1, text: 'buy milk', createdAt: new Date() },
    { id: 2, text: 'buy bread', createdAt: null },
];
export class TodosController {
    //* DI (dependency injection)
    constructor() {

    }

    public getTodos = (req: Request, res: Response) => {
        res.json(todos);
    }
    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) {
            res.status(400).json({ message: 'id must be a number' });
            return;
        }

        const todo = todos.find(todo => todo.id === id);
        if (!todo) {
            res.status(404).json({ message: `todo with id ${id} not found` });
            return;
        }

        res.json(todo);

    }
    public createTodo = (req: Request, res: Response) => {
        const {text}=req.body;
        if(text)
        {

            const newTodo={id:todos.length+1,text:text,createdAt:null};
            todos.push(newTodo);
            res.status(201).json(newTodo);
        }
        res.status(400).json({message:'text is required'});
        return;
    }
    public updateTodo = (req: Request, res: Response) => {
        res.json({ message: 'update todo' });
    }
}