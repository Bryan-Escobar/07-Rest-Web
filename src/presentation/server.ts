import express, { Router } from 'express';
import path from 'path';
import compression from 'compression';
interface Options {
    port: number;
    routes:Router;
    publicPath?: string;
}
export class Server {
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(private options: Options) {
        const { port, routes,publicPath = 'public' } = options;
        this.port = port;
        this.publicPath = publicPath;
        this.routes = routes;
    }

    async start() {


        //* Middlewares
        this.app.use(express.json()); //indica que se va a recibir informacion en formato json
        this.app.use(express.urlencoded({ extended: true })); //indica que se va a recibir informacion en formato urlencoded
        this.app.use(compression()); //indica que se va a comprimir la informacion que se envia al cliente
        //* Public Folder
        this.app.use(express.static(this.publicPath));
        //indica que se va a enviar informacion de la carpeta public


        //* routes
        this.app.use(this.routes);


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