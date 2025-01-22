import { Router } from "express";
import { TodosController } from "./todos/controller";
import { TodosRoutes } from "./todos/todo-routes";

export class AppRoutes
{
    //get indica que la funcion routes() es un getter
    static get routes():Router
    {
        const router= Router();

        router.use('/api/todos',TodosRoutes.routes);
        //indica que las rutas definidas en la clase TodosRoutes se van a escuchar en '/api/todos'

        return router; 
    }
}