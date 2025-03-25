"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./todos/controller");
const todo_routes_1 = require("./todos/todo-routes");
class AppRoutes {
    //get indica que la funcion routes() es un getter
    static get routes() {
        const router = (0, express_1.Router)();
        const todoController = new controller_1.TodosController();
        router.use('/api/todos', todo_routes_1.TodosRoutes.routes);
        //indica que las rutas definidas en la clase TodosRoutes se van a escuchar en '/api/todos'
        return router;
    }
}
exports.AppRoutes = AppRoutes;
