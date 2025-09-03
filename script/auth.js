
document.addEventListener('DOMContentLoaded', function() {
    usuarioIniciado();  
});



//funcion para saber si el ususario a iniciado sesion
function usuarioIniciado() {
    if (sessionStorage.getItem(USUARIO)) {
        window.location.href = 'index.html'; 
    }
}


