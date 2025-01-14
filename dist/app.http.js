"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const server = http_1.default.createServer((req, res) => {
    var _a, _b;
    console.log(req.url);
    // res.write('Hello World');
    // res.writeHead(200)
    // res.writeHead(200,{'Content-Type':'text/html'});
    // res.write(`<h1>URL: ${req.url}</h1>`);
    // const data={name:'John',age:30};
    // res.writeHead(200,{'Content-Type':'application/json'});
    // res.end(JSON.stringify(data));
    if (req.url === '/') {
        // //ubicacion del index.html si public esta dentro de src/
        // const htmlFile=fs.readFileSync('./src/public/index.html','utf-8');
        //ubicacion del index.html si public esta fuera de src
        const htmlFile = fs_1.default.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(htmlFile);
        return;
    }
    if ((_a = req.url) === null || _a === void 0 ? void 0 : _a.endsWith('.js')) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
    }
    else if ((_b = req.url) === null || _b === void 0 ? void 0 : _b.endsWith('.css')) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
    }
    console.log(`url==========> ./public${req.url}`);
    const responseContent = fs_1.default.readFileSync(`./public${req.url}`, 'utf-8');
    res.write(responseContent);
    // else
    // {
    //     res.writeHead(404,{'Content-Type':'text/html'});
    //     // res.write('<h1>404 Not Found</h1>');
    // }
    res.end();
    // application/javascript
    // text/css
});
server.listen(8080, () => {
    console.log('Server is running on port 8080');
});
