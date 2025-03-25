"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
class TodosRoutes {
    //get indica que la funcion routes() es un getter
    static get routes() {
        const router = (0, express_1.Router)();
        const todoController = new controller_1.TodosController();
        router.get('/', todoController.getTodos);
        //se le pasan la request y response a la funcion getTodos automaticamente
        //INFO: el '/' indica que el get se va a escuchar en api/todos/ 
        // (api/todos)===>ruta base definida en la clase AppRoutes
        //(/)===>ruta definida en la clase TodosRoutes para el get
        router.get('/:id', todoController.getTodoById);
        router.post('/', todoController.createTodo);
        router.put('/:id', todoController.updateTodo);
        router.delete('/:id', todoController.deleteTodo);
        return router;
    }
}
exports.TodosRoutes = TodosRoutes;
