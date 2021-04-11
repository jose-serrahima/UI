var express = require('express');
var path = require('path');
var http = require('http');

var app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/public"); 
// Parseo de la request enviada a un servicio
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Anade fichero con la funcionalidad de editar
var editar = require('./routes/plantilla');
var configuracion = require('./routes/configuracion');
var preseed = require('./routes/plantillas/preseed');
app.use('/plantillas/preseed', preseed);
app.use('/plantillas', editar);
app.use('/configuracion', configuracion);

module.exports = app;

const fs = require('fs');

// Carga en el módulo express para servir la página
//app.use(express.static(path.join(__dirname, 'public')));

// Sirve la página
app.get('/', function(req, res) {
    res.render('index');
});

app.post('/', function(req, res){

	console.log(req.body.idioma);
	console.log(req.body.huso);


	// TODO: recuperar fichero de la configuración
	/*fs.writeFile('escritura_fichero', 'Hola', function(err){
		if (err) throw err;
		console.log("Fichero guardado");
	});*/
	ejecutar_fichero(req);
	//res.render('index');
	res.redirect('http://localhost:8080');
})


//TODO: ver como escuchar en el puerto 80
//app.listen(80);



// Servicios para ejecución
app.post('/editar_fichero', editar_fichero);
app.post('/ejecutar_fichero', ejecutar_fichero);

function ejecutar_fichero(req){
	ejecutar_comando("sh comando");
}
function editar_fichero(req){
	ejecutar_comando("nano comando");
}

function ejecutar_comando(comando){
	const { exec } = require("child_process");
	
	exec("./gotty -w --once "+comando, (error, stdout, stderr) => {
	    if (error) {
	        console.log(`error: ${error.message}`);
	        return;
	    }
	    if (stderr) {
	        console.log(`stderr: ${stderr}`);
	        return;
	    }
	    console.log(`stdout: ${stdout}`);
	});
}