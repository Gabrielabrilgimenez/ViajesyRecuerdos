//inicio de sesion con fecth
function hacerlogin2(evt){

    evt.preventDefault();

    let url = 'api/usuarios/login',
        fd = new FormData (evt.target);

    fetch( url, {method:'POST', body:fd} ).then(
        function(resp){
            if(resp.ok) {

                resp.json().then(function(info){
                    if(info.RESULTADO == 'OK'){

                        console.log(info);
                        sessionStorage[ USUARIO ] = JSON.stringify(info);
                        mostrarDialogo('Usuario iniciado correctamente')
                    }
                });
            }
            else{


                mostrarDialogo('Error: Alguno de los datos introducidos esta mal')   

                console.log(resp);
            }
        });
}

//mensajes modales

function mostrarDialogo(mensaje) {
    let dialogo = document.querySelector('dialog');
    let mensajeElemento = document.getElementById('mensajeDialogo');
    
    mensajeElemento.textContent = mensaje;
    dialogo.showModal();
}

function dialogoCerrado() {
    let dialogo = document.getElementById('dialogoMensaje'); 
    if (dialogo) {
        
        if (sessionStorage.getItem('datos_usuario')) {
            window.location.href = 'login.html'; 
        }
        
        dialogo.close(); 
    }
}

function dialogoCerradoSinRedirijir() {
    let dialogo = document.getElementById('dialogoMensaje'); 
    if (dialogo) {
        
        dialogo.close(); 
    }
}

function dialogoCerradoNuevaExp() {
    let dialogo = document.getElementById('dialogoMensaje'); 
    if (dialogo) {
        window.location.href = 'index.html'; 
        
        dialogo.close(); 
    }
}
