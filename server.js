const http = require('http');
const fs = require('fs');
const { parse } = require('querystring');

const server = http.createServer((req, res) => {
// NAVEGACION  inicio ----------------------------------
    var url = req.url;
    var fileName = "";
    if (url === "/") {
        fileName = "1_0_index.html";
    }
    else if (url === "/procesar") {
        fileName = "1_1_form.html";
    }
    else if (url === "/contact")
        fileName = "1_2_contact.html";

    else if (url === "/gracias") {
        fileName = "1_5_thanks.html";
    }
    else if (url === "/login") {
        fileName = "1_1_login.html";

    else if (url === "/inicio") {
        fileName = "2_0_inicio.html";
    }
    
// NAVEGACION  fin ----------------------------------

    if (req.method === 'GET') {
        fs.readFile(fileName, (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Not Found');
            } else {
                res.statusCode = 200;
                let contentType = 'text/html';
                if (fileName.endsWith('.css')) {
                    contentType = 'text/css';
                } else if (fileName.endsWith('.js')) {
                    contentType = 'text/javascript';
                }
                res.setHeader('Content-Type', contentType);
                res.end(data);
            }
        });
    }

    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const formData = parse(body);
            let filePath;

            if (req.url === '/contact') {
                filePath = 'data_contact_form.txt';
            } else if (req.url === '/procesar') {
                filePath = 'data_job_application.txt';
            } else if (req.url === '/procesLogin') {
                filePath = 'data_login.txt';
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
                return;
            }

            const dataString = Object.values(formData).join(', ') + '\n';
            fs.appendFile(filePath, dataString, err => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error al guardar los datos');
                } else {
                    res.writeHead(302, { 'Location': '/gracias' });
                    res.end();
                }
            });
        });
    }
});

server.listen(3000, () => {
    console.log('Server running on http://127.0.0.1:3000/');
});