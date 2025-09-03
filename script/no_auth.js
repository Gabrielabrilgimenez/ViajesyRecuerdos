
document.addEventListener('DOMContentLoaded', function() {
    usuarioNoIniciado();  
});



//funcion para saber si el ususario a iniciado sesion
function usuarioNoIniciado() {
    if (!sessionStorage.getItem(USUARIO)) {
        window.location.href = 'index.html';
    }
}


