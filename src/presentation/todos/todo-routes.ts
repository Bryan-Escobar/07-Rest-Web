import { Router } from "express";
import { TodosController } from "./controller";

export class TodosRoutes
{
    //get indica que la funcion routes() es un getter
    static get routes():Router
    {
        const router= Router();
        const todoController=new TodosController();
        router.get('/',todoController.getTodos);
        //se le pasan la request y response a la funcion getTodos automaticamente
        return router;
    }
}