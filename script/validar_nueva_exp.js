document.getElementById("create").addEventListener("click", function(event) {
    event.preventDefault(); 

    const campoFoto = document.querySelector('.campo-foto');
    const inputFile = document.getElementById('fileInput');
    const textarea = document.getElementById('photo-des'); 

    // Verifica que haya al menos una foto y una descripción
    if (!campoFoto) {
        mostrarDialogo("Debe agregar alguna foto");
        return; // Sale de la función si no hay foto
    }

    if (inputFile.files.length === 0 || textarea.value.trim() === "") {
        mostrarDialogo("No se pueden dejar fichas de fotos sin foto y/o descripción");
        return; // Sale de la función si falta alguna información
    }

    // Si todo es correcto, enviar los datos a la API
    enviarFormulario(event);
});


function enviarFormulario(evt) {
    evt.preventDefault(); 

    let url = 'api/experiencias',
        frm = evt.target.closest('form'), 
        xhr = new XMLHttpRequest(),
        fd = new FormData(); 

    const titulo = frm.querySelector('input[name="titulo"]').value;
    const texto = frm.querySelector('textarea[name="texto"]').value;
    const tiempo = frm.querySelector('input[name="tiempo"]').value;

    fd.append('titulo', titulo);
    fd.append('texto', texto);
    fd.append('tiempo', tiempo);

    categoriasElegidas.forEach(categoria => {
        fd.append('categorias[]', categoria);
    });

    const fotosInputs = frm.querySelectorAll('input[type="file"][name="fotos[]"]');
    fotosInputs.forEach(input => {
        for (let i = 0; i < input.files.length; i++) {
            fd.append('fotos[]', input.files[i]); 
        }
    });

    // Agregar las descripciones de las fotos
    const descripciones = frm.querySelectorAll('textarea[name="descripciones[]"]');
    descripciones.forEach(desc => {
        fd.append('descripciones[]', desc.value);
    });

    xhr.open('POST', url, true);
    xhr.responseType = 'json';

    // Configurar el header con los datos de sesión
    const usu = JSON.parse(sessionStorage[USUARIO]);
    xhr.setRequestHeader('Authorization', usu.LOGIN + ':' + usu.TOKEN);

    // Manejar la respuesta del servidor
    xhr.onload = function () {
        const res = xhr.response;

        console.log('Respuesta del servidor:', res); 

        if (res.RESULTADO === 'OK') {
            mostrarDialogo("Experiencia registrada correctamente: " + titulo);
        } else {
            mostrarDialogo("Error al registrar la experiencia");
        }
    };

    // Manejar el error de la solicitud
    xhr.onerror = function () {
        mostrarDialogo("Error de red al realizar la solicitud");
    };

    // Enviar la solicitud
    xhr.send(fd);
}
