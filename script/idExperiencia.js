let num = 0;

document.addEventListener('DOMContentLoaded', function() {
    pedirExpId(),
    pedirFotos(num),
    showComentarios(),
    obtenercategoriasid();  
});

function pedirExpId() {

    //conseguimos id

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if(id === null){
        window.location.href = 'index.html'; 
    }


    let url = `api/experiencias/${id}`, 
        xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onload = function() {
        if (xhr.status === 200) { 
            let res = xhr.responseText; 
            let obj = JSON.parse(res);

            //descripcion  de la experiencia
            let desc = document.querySelector('.zona2 h3');
            let html = '';

            obj.FILAS.forEach(function(e) { 
                html = `<p>${e.texto}</p>`;
            });

            desc.insertAdjacentHTML('afterend', html)

            //info publicacion

            //descripcion  de la experiencia
            let ul = document.querySelector('#info_publi');
            html = '';

            obj.FILAS.forEach(function(e) { 

                const date = new Date(e.fechaCreacion);

                // Opciones de formato
                const options = {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                };

                const formattedDate = date.toLocaleString('es-ES', options);

                html = `                
                <li> Usuario:${e.login}</li>
                <li>Fecha: ${e.fechaCreacion}</li>
                <li><a href="#coments">Comentarios: ${e.nComentarios} </a></li>
                <li> Valoración:${e.valoracion}/5</li>
                <li id="categorias"></li>
                <li> Tiempo: ${e.tiempo}</li>
                <li> Fecha: ${formattedDate}</li>`;
                
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

function pedirFotos(num){

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    let url = `api/experiencias/${id}/fotos`, 
        xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onload = function() {
        if (xhr.status === 200) { 
            let res = xhr.responseText; 
            let obj = JSON.parse(res);
        
        
            //foto url
            
            // Asignar dinámicamente las rutas
            const imageElement = document.getElementById("image");
            const linkElement = document.getElementById("image-link");

            imageElement.src = `fotos/${obj.FILAS[num].archivo}`;
            linkElement.href = `fotos/${obj.FILAS[num].archivo}`;

            let pos = document.querySelector('#posicion');
            let html = '';

            html= `${num}/${obj.FILAS.length -1}`

            pos.innerHTML = html;

            let des = document.querySelector('#foto_des');
            html = '';
            html= `<p>${obj.FILAS[num].descripcion} </p>`;

            des.innerHTML = html;
        }
    }
    xhr.send();
}

function sumarCont(){
    num++;
    pedirFotos(num);
}

function restarCont(){
    num--;
    pedirFotos(num);

}

function showComentarios() {
    
    // Verificar si el usuario está logueado 
    if(sessionStorage['__usuario__']) {
        const enlace = document.getElementById("login_comt");
        
        if (enlace) {
            enlace.remove(); 
        }
    

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        let url = `api/experiencias/${id}/comentarios`, 
            xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);

        xhr.onload = function() {
            if (xhr.status === 200) { 
                let res = xhr.responseText; 
                let obj = JSON.parse(res);

                let coment = document.querySelector('#comentarios');
                let html = ''; 
                html += `<h2>Comentarios X</h2>
                        <div class="comments-section" id="coments">`

                
                obj.FILAS.forEach(function(e) {

                    html += `
                            <div class="comment">
                                <h4>${e.login}</h4>
                                <p>${e.texto}</p>
                                <p>Valoracion: ${e.valoracion}/5</p>
                                <time datetime="${e.fechaHora}">${e.fechaHora}</time>
                            </div>
                        `;
                });

                //obtencion de formulario de comentarios mediante funcion asincrona 
                obtenerformCom(html, function(comentarioForm) {
                    html += comentarioForm; 
                    coment.innerHTML = html; 
                });
            }
        }
        xhr.send();
    }
    
}

//funcion para obtener el formualrio de comentarios
function obtenerformCom(html, callback) {
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'comentario.txt', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var contenido = xhr.responseText;
            callback(contenido);
        }
    };
    xhr.send();
}

//funcion para hacer un comentario a la API
function dejarComentario(evt){

    evt.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log(id);
    
    let url = `api/experiencias/${id}/comentarios`
        frm = evt.target,
        fd = new FormData(frm),
        xhr = new XMLHttpRequest();
        usu = JSON.parse(sessionStorage[USUARIO]);


    xhr.open('POST',url,true);
    xhr.responseType = 'json';

    xhr.onload = function(){

        let res = xhr.response;
        showComentarios();
        mostrarDialogo("Comentario enviado correctamente")

    }

    xhr.setRequestHeader('Authorization', usu.LOGIN + ':' + usu.TOKEN);
    xhr.send(fd);
}

//funcion para obtener todas las categorias de una experiencia con id 
function obtenercategoriasid() {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log(id);

    let url = `api/experiencias/${id}/categorias`;
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.responseType = 'json';

    xhr.onload = function() {

        if (xhr.status === 200) {

            let res = xhr.response;

            let li_cat = document.querySelector('#categorias');
            if (!li_cat) return; 

            let html = '';
            html = 'Categorias: '

            res.FILAS.forEach(function(e) {
                html += `<a href="buscar.html?c=${e.nombre}">${e.nombre}</a>`;
            });

            li_cat.innerHTML = html;
        }
    };

    xhr.send();
}











