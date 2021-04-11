var express = require('express');
var router = express.Router();
module.exports = router;

const fs = require('fs');
const ejs = require("ejs");

var ruta_propiedades = './plantillas/preseed.properties';
var lector_propiedades = require('properties-reader');
var fichero_propiedades = lector_propiedades(ruta_propiedades);

var parametros = [];

router.get('/', function(req, res) {
    get_valores();
    res.render('plantillas/preseed', {parametros:parametros});
});

function get_valores(){
    parametros = [];
    fichero_propiedades.each((key,value) => {
        var propiedad = {clave: key, valor: value};
        parametros.push(propiedad);
    });
}