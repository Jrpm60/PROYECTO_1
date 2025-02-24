import { createServer } from 'node:http';
import fs from 'node:fs';

const server = createServer((req, res) => {

    // /login
    var url = req.url;
    var fileName = "";
    
    if (url === "/") {
        fileName = "index.html";
    }
    
    if (req.method=="POST") {
        req.on('data', chunk => {
            body += chunk.toString(); // Collect chunk
        });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/form.html');
});

app.post('/procesar', (req, res) => {
    const name = req.body.name;
    const apellido1 = req.body.apellido1;
    const apellido2 = req.body.apellido2;
    const email = req.body.email;
    const dni = req.body.dni;
    const edu = req.body.edu;

    const datos = `Nombre: ${name}, Apellido1: ${apellido1}, Apellido2: ${apellido2}, Email: ${email}, DNI: ${dni}, Formación: ${edu}\n`;
    fs.appendFile('datos.txt', datos, (err) => {
        if (err) {
            console.error(err);
            res.send('Error al guardar los datos.');
        } else {
            res.send('¡Formulario enviado con éxito!');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});