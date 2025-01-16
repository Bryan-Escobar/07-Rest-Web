import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
export class TodosController {
    //* DI (dependency injection)
    constructor() {

    }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany();
        res.json(todos);
    }
    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (!this.isIdValid(id, res)) {
            return;
        }
        const todo = await this.findTodoById(id);

        if (!todo) {
            res.status(404).json({ message: `todo with id ${id} not found` });
            return;
        }

        res.json(todo);

    }
    public createTodo = async (req: Request, res: Response) => {
        const { text, completedAt } = req.body;
        let newTodo = null
        if (text) {
            if (completedAt) {

                newTodo = await prisma.todo.create({
                    data: { text, completedAt }
                })
            }
            else {
                newTodo = await prisma.todo.create({
                    data: { text }
                })
            }

            res.status(201).json(newTodo);
            return;
        }
        res.status(400).json({ message: 'text is required' });
        return;
    }
    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (!this.isIdValid(id, res)) {

            return;
        }
        const todo = await this.findTodoById(id);

        if (!todo) {
            res.status(404).json({ message: `todo with id ${id} not found` });
            return;
        }

        //validaciones de los datos enviados
        let { text, completedAt } = req.body;
        if (!completedAt) { //si no se envia completedAt, se mantiene el valor actual
            completedAt = todo.completedAt;
        }
        if (isNaN(new Date(completedAt).getTime())) { //verifica que completedAt sea una fecha valida

            res.status(400).json({ message: 'completedAt must be a valid date' });
            console.log('no es una fecha valida');
            return
        }

        //actualizacon de los datos
        const updatedTodo = await prisma.todo.update({
            where: { id: id },
            data: { text: text, completedAt: completedAt }
        });
        res.json(updatedTodo);
        return;


    }
    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (!this.isIdValid(id, res)) {
            return;
        }


        try {
            const todo = await prisma.todo.delete({
                where: { id: id }
            });
            res.json(todo);
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
    findTodoById = (id: number) => {
        return prisma.todo.findUnique({
            where: { id: id }
        });
    }
}
