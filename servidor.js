const http = require('http');
const url = require('url');
const fs = require('fs');
const servidor = http.createServer((req, res) =>{
    const parsedUrl = url.parse(req.url, true);

    if (req.method === 'GET' && parsedUrl.pathname === '/mostrar-registros-embebidos') {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        res.write('<h1>Ejemplo formulario</h1>');
        res.write('<ul>');
        for (let i = 0; i < 5; i++) {
            res.write(`<li>Listado de registros existentes: ${i}</li>`);
        }
        res.write('</ul>');
        res.end();
    }

    if(req.method == "GET" && parsedUrl.pathname == "/agregar-registros"){
        // Mostrar formulario para agregar registro
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile('form.html', (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end('Error cargando el formulario.');
        }
        res.end(data);
        });
    }

    if (req.method === 'POST' && parsedUrl.pathname === '/agregar-registros'){
        // Recibir datos del formulario
        let body = '';
        req.on('data', data => {
            body += data; // Concatenando los fragmentos de datos
        });
        req.on('end', () => {
            const nombre = new URLSearchParams(body).get('nombre');
            const edad = new URLSearchParams(body).get('edad');

            console.log("Información recibida del formulario:");
            console.log("Nombre: " + nombre);
            console.log("Edad: " + edad);

            // Resto de código para tratar la información, por ejemplo guardarla
            res.writeHead(302, { 'Location': '/mostrar-registros-embebidos' });
            res.end();
        });
    }
});

servidor.listen(3000, () => {
    console.log("Servidor ejecutándose");
});