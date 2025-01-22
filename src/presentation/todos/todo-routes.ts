import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDataSourceImpl } from "../../infrastructure/datasources/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repository.impl";
export class TodosRoutes
{
    //get indica que la funcion routes() es un getter
    static get routes():Router
    {
        const router= Router();
        const datasource=new TodoDataSourceImpl();
        const respository=new TodoRepositoryImpl(datasource);
        const todoController=new TodosController(respository);
        router.get('/',todoController.getTodos);
        //se le pasan la request y response a la funcion getTodos automaticamente

        //INFO: el '/' indica que el get se va a escuchar en api/todos/ 
        // (api/todos)===>ruta base definida en la clase AppRoutes
        //(/)===>ruta definida en la clase TodosRoutes para el get

        router.get('/:id',todoController.getTodoById);
        router.post('/',todoController.createTodo);
        router.put('/:id',todoController.updateTodo);
        router.delete('/:id',todoController.deleteTodo);
        return router;
    }
}