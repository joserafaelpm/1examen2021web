function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

var datos;

loadJSON('https://carlosreneas.github.io/endpoints/noticias.json',
         function(data) { 
            datos = data;
             cargarimagen(data[0].img);
             cargarTresPrimerasNoticias();
             cargarDataCategorias(data);
             
          },
         function(xhr) { console.error(xhr); }
);


function cargarDataCategorias(array){
    var divcdeportes=document.querySelector("#contenedor-opcionesDeportes");
    var divtec = document.querySelector("#contenedor-opcionesColegio"); 
    for(var i=0;i<array.length;i++){
       var nameca=array[i].categoria;
       if(nameca=="Colegio"){
        divtec.innerHTML +='<div class="opcion">'+array[i].titulo+'</div><hr>';
       }else if(nameca="Deportes"){
        divcdeportes.innerHTML += '<div class="opcion">'+array[i].titulo+'</div><hr>';
       }
    }
}

function cargarimagen(url){
    document.getElementById("img-noticia").src=url;
}


function cargarTresPrimerasNoticias(){
    reset();
    var div = document.querySelector("#contenedor-noticias");
    for(var i=0;i<3;i++){
        div.innerHTML += '<div class="noticia"><div class="titulo">'+datos[i].titulo+' '+datos[i].fecha+'</div><hr><div class="descripcion">'+datos[i].descripcion+' <a href="html/vermas.html?id='+datos[i].id+'" class="btn btn-success m-auto">Ver más</a></div></div>';
    }
    div.innerHTML +='<button onclick="verTodasNoticias()" class="btn btn-success w-100 b-20" >Ver todas las noticias</button>';
}

function verTodasNoticias(){
    reset();
    var div = document.querySelector("#contenedor-noticias");
    console.log(datos);
    for(var i=0;i<datos.length;i++){
        div.innerHTML += '<div class="noticia"><div class="titulo">'+datos[i].titulo+' '+datos[i].fecha+'</div><hr><div class="descripcion">'+datos[i].descripcion+' <a href="html/vermas.html?id='+datos[i].id+'" class="btn btn-success m-auto">Ver más</a></div></div>';
    }
    div.innerHTML +='<button onclick="cargarTresPrimerasNoticias()" class="btn btn-success w-100 b-20" >Ver menos noticias</button>';
}

function reset(){
     var div = document.querySelector("#contenedor-noticias");
     div.innerHTML ="";
}




