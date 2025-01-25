import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';
import { response } from 'express';
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
        const {body}=await request(testServer.app)
        .get('/api/todos/999')
        .expect(400);
        expect(body).toEqual('Todo with id 999 not found');
    });

    
});