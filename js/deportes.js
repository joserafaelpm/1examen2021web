
var datos;

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

loadJSON('https://carlosreneas.github.io/endpoints/categoria_deporte.json',
         function(data) { 
            datos = data;
            verdeportes(); 
          },
         function(xhr) { console.error(xhr); }
);

function verdeportes(){
    var div = document.querySelector("#contenedor-deportes");
    console.log(datos);
    for(var i=0;i<datos.length;i++){
        div.innerHTML += '<div class="noticia"><div class="titulo">'+datos[i].titulo+' '+datos[i].fecha+'</div><hr><div class="descripcion">'+datos[i].descripcion+' <a href="html/vermas.html?id='+datos[i].id+'" class="btn btn-success m-auto">Ver más</a></div></div>';
    }
    div.innerHTML +='<button onclick="cargarTresPrimerasNoticias()" class="btn btn-success w-100 b-20" >Ver menos noticias</button>';
}