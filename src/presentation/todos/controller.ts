import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "./../../domain/dtos";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";
export class TodosController {
    //* DI (dependency injection)
    constructor(private readonly todoRepository: TodoRepository) {

    }

    public getTodos = (req: Request, res: Response) => {
        const todos = new GetTodos(this.todoRepository).execute()
        .then((todos)=>{res.json(todos);})
        .catch((error)=> res.status(400).json(error));
        return;
    }
    public getTodoById =(req: Request, res: Response) => {
        const id = +req.params.id;
        if (!this.isIdValid(id, res)) {
            res.status(400).json({ message: 'id must be a number' });
            return;
        }

        new GetTodo(this.todoRepository).execute(id)
        .then((todo)=>{res.json(todo);})
        .catch((error)=> res.status(400).json(error));
        return;

    }
    public createTodo =(req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) {
            res.status(400).json({ message: error });
            return;
        }
        new CreateTodo(this.todoRepository).execute(createTodoDto!)
        .then((todo)=>{res.status(201).json(todo);})
        .catch((error)=> res.status(400).json(error));
        return;

    }
    public updateTodo =(req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

        //...req.body indica que se envian todos los datos del body, se copian todas sus propiedades y se le añaide el id
        if (error) {
            res.status(400).json({ message: error });
            return;
        }
        new UpdateTodo(this.todoRepository).execute(updateTodoDto!)
        .then((todo)=>{res.json(todo);})
        .catch((error)=> res.status(400).json(error));

    }
    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (!this.isIdValid(id, res)) {
            return;
        }

        new DeleteTodo(this.todoRepository).execute(id)
        .then((todo)=>{res.json(todo);})
        .catch((error)=> res.status(400).json(error));
    }


    isIdValid = (id: number, res: Response) => {
        if (isNaN(id)) {
            res.status(400).json({ message: 'id must be a number' });
            return false;
        }
        return true;

    }

}
