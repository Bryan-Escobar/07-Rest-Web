import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';
import { response } from 'express';
import exp from 'constants';
beforeAll(async ()=>
{
    await testServer.start();
});
afterAll(()=>{
    testServer.close(); //cierra el proceso de express, evita error de "worker process exited gracefully"
})
beforeEach(async()=>{
    await prisma.todo.deleteMany();
})
describe('Testing todo-routes.ts', () => {
    const todo1={text:'todo1'}
    const todo2={text:'todo2'}
    
    test('should return TODOs api/todos', async() => {
        await prisma.todo.createMany({
            data:[todo1,todo2]
        });
       const {body}=await request(testServer.app)
        .get('/api/todos')
        .expect(200);
        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBe(2);
    });
    test('should return TODOs api/todos/1', async() => {
        const todo=await prisma.todo.create({
            data:{text:'Todo3'}
        });
        console.log(todo);
       const {body}=await request(testServer.app)
        .get(`/api/todos/${todo.id}`)
        .expect(200);
        expect(body).toMatchObject(todo);

    });
    test('should return a 404 not found api/todos/:id', async() => {
        const id=999;
        const {body}=await request(testServer.app)
        .get('/api/todos/'+id)
        .expect(400);
        expect(body).toEqual(`Todo with id ${id} not found`);
    });
    test('should return a new Todo', async() => {
        const response=await request(testServer.app)
        .post('/api/todos')
        .send(todo1)
        .expect(201);
        console.log(response.body);
        expect(response.body).toEqual({id:expect.any(Number),text:todo1.text, completedAt:null});
    });
    
    test('should return a new updated TODO api/todos/:id', async() => {
        const todo=await prisma.todo.create({
            data:todo1
        });
        const {body}=await request(testServer.app)
        .put(`/api/todos/${todo.id}`)
        .send({text:'hola mundo', completedAt:'2023-10-21'})
        .expect(400);
        expect(body).toEqual({id:expect.any(Number),text:'hola mundo', completedAt:'2023-10-21'});
    });
    

    test('should delete a todo api/todos:id', async() => {
        const todo=await prisma.todo.create({
            data:todo1
        });
        const {body}=await request(testServer.app)
        .delete(`/api/todos/${todo.id}`)
        .expect(200);
        console.log(body);
        expect(body).toEqual({ id: expect.any(Number), text: 'todo1', completedAt: null })
    });
});