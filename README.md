Pasos para levantar la aplicacion.
1.ejecutar npm install para instalar los node_modules
2.Crear el .env apartir del .env.template
3.generar el certificado para https con: openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
4.ejecutar npm run dev