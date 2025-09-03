
document.addEventListener("DOMContentLoaded", pedirCategorias(),buscarSiHayParametro());

function buscarSiHayParametro() {
    let params = new URLSearchParams(window.location.search);
    if (params.has('c')) {
        let categoria = params.get('c');

        let interval = setInterval(() => {
            let select = document.querySelector('#category');
            if (select && select.options.length > 0) {
                select.value = categoria;

                buscarExperiencias(new Event('submit'));
                clearInterval(interval); 
            }
        }, 100);
    }
}


function buscarExperiencias(evt) {
    evt.preventDefault(); 

    let form = document.getElementById('search_form');
    let formData = new FormData(form);
    let params = new URLSearchParams();
    
    formData.forEach((value, key) => {
        if (value.trim() !== '') { 
            params.append(key, value);
        }
    });
    
    let url = 'api/experiencias';
    if (params.toString()) {
        url += '?' + params.toString();
    }
    
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            mostrarResultados(data);
        } else {
            console.error('Error en la petición:', xhr.status);
        }
    };

    xhr.send();
}

function mostrarResultados(data) {
    let ul = document.querySelector('#container');
    let html = '';
    
    data.FILAS.forEach(e => {
        html += `
        <li>
            <a href="experiencia.html?id=${e.id}">
                <figure>
                    <img src="fotos/${e.foto}" width="200" alt="Imagen" title="${e.titulo}">
                    <figcaption>${e.titulo}</figcaption>
                </figure>
            </a>
            <p>
                <time datetime="${e.fechaCreacion}">Fecha: ${e.fechaCreacion}</time>
            </p>
            <p>Comentarios: ${e.nComentarios}</p>
            <p>Valoración: ${e.valoracion}</p>
        </li>`;
    });
    
    ul.innerHTML = html;
}


function pedirCategorias(){

    let url = 'api/categorias';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);


    xhr.onload = function() {
        if (xhr.status === 200) {
            let res = xhr.responseText; 
            let obj = JSON.parse(res);

            let select = document.querySelector('#category');
            let html = '';

            obj.FILAS.forEach(function(e) { 
                html += `<option> ${e.nombre}</option>`
            });

            select.innerHTML = html;


        } else {
            console.error('Error en la petición:', xhr.status);
        }
    };
    xhr.send();
}




