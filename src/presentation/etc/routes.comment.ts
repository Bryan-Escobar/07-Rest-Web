import { Router } from "express";
import { TodosController } from "../todos/controller";

export class AppRoutes
{
    //get indica que la funcion routes() es un getter
    static get routes():Router
    {
        const router= Router();
        const todoController=new TodosController();
        //definicion de rutas

        //NOTE: Sin controlador
        // router.get('/api/todos', (req, res) => {
        //     res.json([
        //         { id: 1, text: 'buy milk', createdAt: new Date() },
        //         { id: 2, text: 'buy bread', createdAt: new Date() },
        //     ]);
        // });
        
        //NOTE:Con controlador

        //NOTE:1.Sintaxis larga
        // router.get('/api/todos',(req,res)=>
        //     todoController.getTodos(req,res) );


        //NOTE:1.Sintaxis corta
        router.get('/api/todos',todoController.getTodos);
        //se le pasan la request y response a la funcion getTodos automaticamente
        return router;
    }
}