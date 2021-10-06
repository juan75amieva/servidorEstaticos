// importar las librerias necesarias

const moment = require('moment');
const http = require('http');
const fs = require('fs');


// Definir las constantes 

const host = "localhost";
const port = 8080;



// crear el servidor

const server = http.createServer( (request, response) => {
 

    
 //saber que peticion se hizo

const peticion = request.url

//saber que momento es

const now = moment().format("DD-MM-YYYY hh:mm:ss")

// añadir la peticion que se hizo

const agregado = " " + now + " - " + peticion;
fs.appendFile('request.log', agregado, (error, file) =>  {
    if (error) throw error;
    console.log('Saved!');
    });


if (peticion === "/estaticos") {
        fs.readFile('front/index.html', (error, data) => {

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        });
    }
 
    else 

if (peticion === "/styles") {
    fs.readFile('front/css/styles.css', (error, data) => {

        response.writeHead(200, { 'Content-Type': 'text/css' });
        response.write(data);
        response.end();
        

        });
    }

    else

    if (peticion === "/img") {
        fs.readFile('front/img/img.jpg', (error, data) => {

            response.writeHead(200, { 'Content-Type': 'image/jpeg' });
            response.write(data);
            response.end();
        

        });
    }

    else

             // Http Headers
        {response.writeHead(401, {
            'Content-Type' : 'text/html'
        });

        // Http Body
        response.write('<p style="font-size:100px;color:red">Estos androides no son los que buscas</p>');

        // Send http message
        response.end();
    }

    

});

// ----- Start server -----

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

