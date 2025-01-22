import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "./../../domain/dtos";
import { TodoRepository } from "../../domain";
export class TodosController {
    //* DI (dependency injection)
    constructor(private readonly todoRepository: TodoRepository) {

    }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await this.todoRepository.getAll();
        console.log(todos);
        res.json(todos);
        return;
    }
    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (!this.isIdValid(id, res)) {
            res.status(400).json({ message: 'id must be a number' });
            return;
        }
        try {
            const todo = await this.todoRepository.findById(id);
            res.json(todo);
            return;
        } catch (error) {
            res.status(404).json({ message: `todo with id ${id} not found` });
            return;
        }



    }
    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) {
            res.status(400).json({ message: error });
            return;
        }
        const newTodo = await this.todoRepository.create(createTodoDto!);
        res.status(201).json(newTodo);
        return;

    }
    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

        //...req.body indica que se envian todos los datos del body, se copian todas sus propiedades y se le añaide el id
        if (error) {
            res.status(400).json({ message: error });
            return;
        }
        try {
            const updatedTodo = await this.todoRepository.UpdateById(updateTodoDto!);
            res.status(200).json(updatedTodo);
            return;
        } catch (error) {
            res.status(404).json({ message: `todo with id ${id} not found` });
            return;
        }

    }
    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (!this.isIdValid(id, res)) {
            return;
        }


        try {
            const deletedTodo =await this.todoRepository.deleteById(id);
            res.json(deletedTodo);
            return;
        } catch (error) {

            res.status(404).json({ message: `todo with id ${id} not found` });
            return;
        }

    }


    isIdValid = (id: number, res: Response) => {
        if (isNaN(id)) {
            res.status(400).json({ message: 'id must be a number' });
            return false;
        }
        return true;

    }

}
