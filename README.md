# DEV
Pasos para levantar la aplicacion.
1.ejecutar npm install para instalar los node_modules
2.Crear el .env apartir del .env.template
3.generar el certificado para https con: openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
4.ejecutar npm run dev
5.ejecutar ```docker compose up -d```  para levantar el contenedor de docker 



# PROD
Para crear las migraciones necesarias en nuestra base de datos debemos ejecutar 
```npm run prisma:migrate:prod```