document.addEventListener("DOMContentLoaded", function () {
    let loginInput = document.getElementById("login");
    let mensaje_login = document.getElementById("login-msg");
    const btnRegistrar = document.getElementById("registrar");

    loginInput.addEventListener("blur", function () {
        const loginValue = loginInput.value.trim();

        const xhr = new XMLHttpRequest();
        xhr.open("GET", `api/usuarios/${loginValue}`, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);

                    if (data.DISPONIBLE) {
                        mensaje_login.textContent = "El login está disponible.";
                        mensaje_login.style.color = 'green'; 
                        btnRegistrar.disabled = false;
                    } else {
                        mensaje_login.textContent = "Ese login esta ya en uso.";
                        mensaje_login.style.color = 'red'; 
                        btnRegistrar.disabled = true;
                    }
                } else {
                    mensaje_login.textContent = "Tienes que introducir un usuario";
                    mensaje_login.style.color = 'red'; 
                    btnRegistrar.disabled = true;
                }
            }
        };

        xhr.send();
    });

    document.getElementById("pwd").addEventListener("input", validarContraseñas);
    document.getElementById("pwd2").addEventListener("input", validarContraseñas);

});



function validarContraseñas() {
    let password = document.getElementById("pwd").value.trim();
    let confirmPassword = document.getElementById("pwd2").value.trim();
    let errorPassword = document.getElementById("password-msg");
    const btnRegistrar = document.getElementById("registrar");



    if (password !== "" && confirmPassword !== "") {
        if (password !== confirmPassword) {
            errorPassword.textContent = "Las contraseñas no coinciden.";
            errorPassword.style.color = 'red'; 
            btnRegistrar.disabled = true;


        } else {
            errorPassword.textContent = "";
            btnRegistrar.disabled = false;
        }
    }
};



function hacerRegistro( evt ){
    evt.preventDefault();

    let url = 'api/usuarios/registro',
        frm = evt.target,
        fd = new FormData(frm), 
        xhr = new XMLHttpRequest();
    
    xhr.open('POST', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        let res = xhr.response;

        console.log(res);
        if(res.RESULTADO == 'OK') {
            sessionStorage['datos_usuario'] = JSON.stringify(res);
            mostrarDialogo("Usuario registrado correctamente") 
        }
    }

    xhr.send( fd );
}
