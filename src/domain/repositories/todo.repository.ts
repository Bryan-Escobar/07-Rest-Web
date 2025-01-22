import { TodoEntity } from "../entities/todo.entity";
import { CreateTodoDto, UpdateTodoDto } from "../dtos";
export abstract class TodoRepository
{
    abstract create(createTodoDto:CreateTodoDto): Promise<TodoEntity>;
    //todo:paginacion
    abstract getAll(): Promise<TodoEntity[]>;

    abstract findById(id:number): Promise<TodoEntity>;
    abstract UpdateById(updateTodoDto:UpdateTodoDto): Promise<TodoEntity>;
    abstract deleteById(id:number): Promise<TodoEntity>;
}