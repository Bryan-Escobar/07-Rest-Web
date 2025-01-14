import express from 'express';
import path from 'path';
interface Options {
    port: number;
    publicPath?: string;
}
export class Server {
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    constructor(private options: Options) {
        const { port, publicPath = 'public' } = options;
        this.port = port;
        this.publicPath = publicPath;
    }

    async start() {


        //* Middlewares

        //* Public Folder
        this.app.use(express.static(this.publicPath));
        //indica que se va a enviar informacion de la carpeta public


        //* routes
        //'/api/todos' es la ruta que se va a escuchar
        //res.json solo se puede realizar una vez por ruta
        this.app.get('/api/todos', (req, res) => {
            res.json([
                { id: 1, text: 'buy milk', createdAt: new Date() },
                { id: 2, text: 'buy bread', createdAt: new Date() },
            ]);
        });


        //* SPA
        //indica que cualquier solicitud que no coincida con las rutas definidas, recibira el contenido del index.html
        this.app.get('*', (req, res) => {
            console.log(req.url);
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        })
        console.log('Server is running');
        this.app.listen(this.port, () => {
            console.log('Server is running on port 3000');
        });
    }
}