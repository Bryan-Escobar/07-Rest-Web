import express from 'express';
import path from 'path';
export class Server
{
    private app=express();
    async start()
    {


        //* Middlewares

        //* Public Folder
        this.app.use(express.static('public'));
        //indica que se va a enviar informacion de la carpeta public


        //indica que cualquier solicitud que no coincida con las rutas definidas, recibira el contenido del index.html
        this.app.get('*',(req,res)=>{
            console.log(req.url);
            //res.send('Hello World');
            const indexPath=path.join(__dirname+'../../../public/index.html');
            res.sendFile(indexPath);
        })
        console.log('Server is running');
        this.app.listen(3000,()=>{
            console.log('Server is running on port 3000');
        });
    }
}