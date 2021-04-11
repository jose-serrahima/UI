var express = require('express');
var router = express.Router();
module.exports = router;

const fs = require('fs');
const ejs = require("ejs");
const bodyParser = require("body-parser");
//var app = require("express")(); 


var ruta_propiedades = './system_config.properties';
var lector_propiedades = require('properties-reader');
var fichero_propiedades = lector_propiedades(ruta_propiedades);

var parametros = [];

router.get('/', function(req, res) {
    get_valores();
    res.render('configuracion', {parametros:parametros});
});

router.post('/', function(req, res){
    guardar_configuracion(req.body);
    get_valores();
    res.render('configuracion', {parametros:parametros});
});

// Establece propiedad en fichero de configuracion
function guardar_configuracion(json){
    for (var clave in json){
        fichero_propiedades.set(clave, json[clave]);
    }	
    fichero_propiedades.save(ruta_propiedades);
}

function get_valores(){
    parametros = [];
    fichero_propiedades.each((key,value) => {
        var propiedad = {clave: key, valor: value};
        parametros.push(propiedad);
    });
}