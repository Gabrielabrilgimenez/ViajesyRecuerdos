document.addEventListener('DOMContentLoaded', function() {
    pedirExp();  
});

function pedirExp() {

    let url = 'api/experiencias', 
        xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onload = function() {
        if (xhr.status === 200) { 
            let res = xhr.responseText; 
            let obj = JSON.parse(res);

            let ul = document.querySelector('#container');
            let html = '';

            obj.FILAS.forEach(function(e) { 
                html += `
                <li>
                    <a href="experiencia.html?id=${e.id}">
                        <figure>
                            <img src="fotos/${e.foto}" width="200" alt="Una montaña" title="${e.titulo}">
                            <figcaption>${e.titulo}</figcaption>
                        </figure>
                    </a>
                    <p>
                        <time datetime="${e.fechaCreacion}">Fecha:${e.fechaCreacion} </time>
                    </p>
                    <p>Numero comentarios:${e.nComentarios}</p>
                    <p>Numero valoracion:${e.valoracion}</p>
                </li>`;
            });

            ul.innerHTML = html;
        } else {
            console.error('Error en la petición:', xhr.status);
        }
    };

    xhr.onerror = function() {
        console.error('Error de conexión');
    };
    
    xhr.send();
}

