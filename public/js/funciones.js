function editar_fichero(){
    $.post("/editar_fichero", function(data) {
        //console.log( "Abierta una consola en localhost:7681" );
    });
    console.log("Vas a editar el fichero");
    console.log("accede a localhost:8080 para ver la consola");
}

function ejecutar_fichero(){
    $.post("/ejecutar_fichero", function(data) {
    
    });
    console.log("Vas a ejecutar el fichero");
    console.log("accede a localhost:8080 para ver la consola");
}

function guardar_configuracion(){
    console.log("TODO: Es necesario implementar esta llama")
}