"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosController = void 0;
const postgres_1 = require("../../data/postgres");
const dtos_1 = require("./../../domain/dtos");
class TodosController {
    //* DI (dependency injection)
    constructor() {
        this.getTodos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const todos = yield postgres_1.prisma.todo.findMany();
            res.json(todos);
        });
        this.getTodoById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            if (!this.isIdValid(id, res)) {
                return;
            }
            const todo = yield this.findTodoById(id);
            if (!todo) {
                res.status(404).json({ message: `todo with id ${id} not found` });
                return;
            }
            res.json(todo);
        });
        this.createTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //const { text } = req.body;
            // if (!text) {
            //     res.status(400).json({ message: 'text is required' });
            //     return;
            // }
            const [error, createTodoDto] = dtos_1.CreateTodoDto.create(req.body);
            if (error) {
                res.status(400).json({ message: error });
                return;
            }
            const newTodo = yield postgres_1.prisma.todo.create({
                data: createTodoDto //el ! indica que no puede ser null
            });
            res.status(201).json(newTodo);
            return;
        });
        this.updateTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            const [error, updateTodoDto] = dtos_1.UpdateTodoDto.create(Object.assign(Object.assign({}, req.body), { id }));
            //...req.body indica que se envian todos los datos del body, se copian todas sus propiedades y se le añaide el id
            if (error) {
                res.status(400).json({ message: error });
                return;
            }
            const todo = yield this.findTodoById(id);
            if (!todo) {
                res.status(404).json({ message: `todo with id ${id} not found` });
                return;
            }
            //validaciones de los datos enviados
            // let { text, completedAt } = req.body;
            // if (!completedAt) { //si no se envia completedAt, se mantiene el valor actual
            //     completedAt = todo.completedAt;
            // }
            // if (isNaN(new Date(completedAt).getTime())) { //verifica que completedAt sea una fecha valida
            //     res.status(400).json({ message: 'completedAt must be a valid date' });
            //     console.log('no es una fecha valida');
            //     return
            // }
            //actualizacon de los datos
            const updatedTodo = yield postgres_1.prisma.todo.update({
                where: { id: id },
                data: updateTodoDto.values
            });
            res.json(updatedTodo);
            return;
        });
        this.deleteTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            if (!this.isIdValid(id, res)) {
                return;
            }
            try {
                const todo = yield postgres_1.prisma.todo.delete({
                    where: { id: id }
                });
                res.json(todo);
                return;
            }
            catch (error) {
                res.status(404).json({ message: `todo with id ${id} not found` });
                return;
            }
        });
        this.isIdValid = (id, res) => {
            if (isNaN(id)) {
                res.status(400).json({ message: 'id must be a number' });
                return false;
            }
            return true;
        };
        this.findTodoById = (id) => {
            return postgres_1.prisma.todo.findUnique({
                where: { id: id }
            });
        };
    }
}
exports.TodosController = TodosController;
