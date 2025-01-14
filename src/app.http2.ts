import http2 from 'http2';
import fs from 'fs';
const server=http2.createSecureServer({
    key:fs.readFileSync('./keys/server.key'),
    cert:fs.readFileSync('./keys/server.crt')
},
    (req,res)=>{
        console.log(req.url);
        // res.write('Hello World');
        // res.writeHead(200)
        // res.writeHead(200,{'Content-Type':'text/html'});
        // res.write(`<h1>URL: ${req.url}</h1>`);

        // const data={name:'John',age:30};
        // res.writeHead(200,{'Content-Type':'application/json'});
        // res.end(JSON.stringify(data));

        if (req.url==='/'){
            // //ubicacion del index.html si public esta dentro de src/
            // const htmlFile=fs.readFileSync('./src/public/index.html','utf-8');
            //ubicacion del index.html si public esta fuera de src
            const htmlFile=fs.readFileSync('./public/index.html','utf-8');
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(htmlFile);
            return;
        }
        if(req.url?.endsWith('.js')){
            res.writeHead(200,{'Content-Type':'application/javascript'});
        }
        else if (req.url?.endsWith('.css')){
            res.writeHead(200,{'Content-Type':'text/css'});
        }
        // console.log(`url==========> ./public${req.url}`);
        try {
            
            const responseContent=fs.readFileSync(`./public${req.url}`,'utf-8');
            res.write(responseContent);
        } catch (error) {
            res.writeHead(404,{'Content-Type':'text/html'});
        }

        res.end();
        // application/javascript
        // text/css
    }
)

server.listen(8080,()=>{
    console.log('Server is running on port 8080');
});