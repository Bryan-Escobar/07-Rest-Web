"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
class Server {
    constructor(options) {
        this.options = options;
        this.app = (0, express_1.default)();
        const { port, routes, publicPath = 'public' } = options;
        this.port = port;
        this.publicPath = publicPath;
        this.routes = routes;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            //* Middlewares
            this.app.use(express_1.default.json()); //indica que se va a recibir informacion en formato json
            this.app.use(express_1.default.urlencoded({ extended: true })); //indica que se va a recibir informacion en formato urlencoded
            //* Public Folder
            this.app.use(express_1.default.static(this.publicPath));
            //indica que se va a enviar informacion de la carpeta public
            //* routes
            this.app.use(this.routes);
            //* SPA
            //indica que cualquier solicitud que no coincida con las rutas definidas, recibira el contenido del index.html
            this.app.get('*', (req, res) => {
                console.log(req.url);
                const indexPath = path_1.default.join(__dirname + `../../../${this.publicPath}/index.html`);
                res.sendFile(indexPath);
            });
            console.log('Server is running');
            this.app.listen(this.port, () => {
                console.log('Server is running on port 3000');
            });
        });
    }
}
exports.Server = Server;
