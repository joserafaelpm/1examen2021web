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



loadJSON('https://carlosreneas.github.io/endpoints/noticias.json',
         function(data) { 
             cargarimagen(data[0].img);
             cargarTresPrimerasNoticias(data);
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


function cargarTresPrimerasNoticias(array){
    var div = document.querySelector("#contenedor-noticias");
    
    for(var i=0;i<3;i++){
        var data=array[i];
        div.innerHTML += '<div class="noticia"><div class="titulo">'+data.titulo+' '+data.fecha+'</div><hr><div class="descripcion">'+data.descripcion+' <a href="html/vermas.html?id='+data.id+'" class="btn btn-success m-auto">Ver más</a></div></div>';
    }

    div.innerHTML +='<button onclick="verTodasNoticias()" class="btn btn-success w-100 b-20" >Ver todas las noticias</button>';

}

function verTodasNoticias(array){
    var div = document.querySelector("#contenedor-noticias");
    for(var i=0;i<5;i++){
        var data=array[i];
        div.innerHTML += '<div class="noticia"><div class="titulo">'+data.titulo+' '+data.fecha+'</div><hr><div class="descripcion">'+data.descripcion+' <a href="html/vermas.html?id='+data.id+'" class="btn btn-success m-auto">Ver más</a></div></div>';
    }
}




