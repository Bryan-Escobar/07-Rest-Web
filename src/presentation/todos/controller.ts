import { Request, Response } from "express";
const todos = [
    { id: 1, text: 'buy milk', completedAt: new Date() },
    { id: 2, text: 'buy bread', completedAt: null },
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
        if (!this.isIdValid(id,res)) {
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
        const { text } = req.body;
        if (text) {

            const newTodo = { id: todos.length + 1, text: text, completedAt: null };
            todos.push(newTodo);
            res.status(201).json(newTodo);
        }
        res.status(400).json({ message: 'text is required' });
        return;
    }
    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (!this.isIdValid(id,res)) {
            
            return;
        }
        const todo = todos.find(todo => todo.id === id);
        if (!todo) {
            res.status(404).json({ message: `todo with id ${id} not found` });
            return;
        }
        const { text,createdAt: completedAt } = req.body;

        // if (!text) {
        //     res.status(400).json({ message: 'text is required' });
        //     return;
        // }
        todo.text = text || todo.text;
        if (completedAt===null) {
            todo.completedAt=null;
        }
        else{
            todo.completedAt = new Date(completedAt || todo.completedAt);
        }
        //! OJO, en js los objetos son pasados por referencia
        
        res.json(todo);
        return;
       
        
    }
    public deleteTodo = (req: Request, res: Response) => {
        const id=+req.params.id;
        if (!this.isIdValid(id,res)) {
            return;
        }
        const index=todos.findIndex(todo=>todo.id===id);
        if (index===-1)
        {
            res.status(404).json({message:`todo with id ${id} not found`});
            return;
        }
        res.json(todos[index]);
        todos.splice(index,1);
    }
    isIdValid=(id:number,res:Response)=>{
        if (isNaN(id)) {
            res.status(400).json({ message: 'id must be a number' });
            return false;
        }
        return true;

    }
}

