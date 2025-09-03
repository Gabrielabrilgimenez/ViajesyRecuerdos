document.addEventListener("DOMContentLoaded", menu);

const USUARIO = '__usuario__';

//funcion para cerrar sesion
function hacerLogout(evt) {

    const xhr = new XMLHttpRequest();
    const url = 'api/usuarios/logout';
    xhr.open('POST', url, true);

    // Configurar la cabecera Authorization
    xhr.setRequestHeader('Authorization', USUARIO.LOGIN + ':' + USUARIO.TOKEN);
    sessionStorage.removeItem(USUARIO); 

    // Manejar la respuesta
    xhr.onload = function() {
    if (xhr.status === 200) {
        console.log('Usuario deslogueado correctamente');
    } else {
        console.error('Error en el logout', xhr.statusText);
    }
    };

    xhr.onerror = function() {
    console.error('Error en la solicitud');
    };
    xhr.send();
}

function menu(){

    let html = '';

    if(sessionStorage['__usuario__']) {

        html += '<li><a href="index.html"><img src="images/home.png" alt="Inicio" width="20" ><span>INICIO</span> </a></li>';
        html += '<li><a href="buscar.html"><img src="images/lupa.png" alt="Inicio" width="20"><span>BUSCAR</span></a></li>';
        html += '<li><a href="index.html" onclick="hacerLogout(event)"><img src="images/logout.png" alt="Inicio" width="20" ><span>LOGOUT</span></a></li>';
        html += '<li><a href="nueva.html"><img src="images/camera.png" alt="Inicio" width="20" ><span>NUEVA EXPERIENCIA</span></a></li>';

    }else {

        html += '<li><a href="index.html"><img src="images/home.png" alt="Inicio" width="20" ><span>INICIO</span> </a></li>';
        html += '<li><a href="buscar.html"><img src="images/lupa.png" alt="Inicio" width="20"><span>BUSCAR</span></a></li>';
        html += '<li><a href="login.html"><img src="images/login.jpeg" alt="Inicio" width="20" ><span>LOGIN</span></a></li>';
        html += '<li><a href="registro.html"><img src="images/user.png" alt="Inicio" width="20" ><span>REGISTRO</span></a></li>';
    }
    document.querySelector('#menu').innerHTML = html;
}
