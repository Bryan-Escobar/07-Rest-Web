import { envs } from '../src/config/envs';
import {Server} from '../src/presentation/server'


//Prueba de integracion para Server
jest.mock('../src/presentation/server'); //simula el modulo de server siempre que se importe
describe('Testin App.ts', () => {
    test('Should work', async() => {
        await import('../src/app');
        expect(Server).toHaveBeenCalledTimes(1);
        expect(Server).toHaveBeenCalledWith({
            port:envs.PORT,
            publicPath:envs.PUBLIC_PATH,
            routes:expect.any(Function)
        });
    });
});