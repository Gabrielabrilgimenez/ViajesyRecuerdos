// Para evitar duplicados
let categoriasElegidas = new Set(); 

function nuevaEtiqueta(evt) {

    evt.preventDefault();
    const input = document.querySelector('#cat');
    const valor = input.value.trim();
    const contenedor = document.querySelector('#etiquetas');

    if (valor !== '' && !categoriasElegidas.has(valor)) {
        categoriasElegidas.add(valor);

        const span = document.createElement('span');
        span.textContent = valor;
        span.classList.add('etiqueta');
        span.style.padding = '5px 10px';
        span.style.margin = '5px';
        span.style.borderRadius = '15px';
        span.style.backgroundColor = '#ddd';
        span.style.display = 'inline-block';

        const close = document.createElement('span');
        close.textContent = ' ×';
        close.style.cursor = 'pointer';
        close.style.marginLeft = '8px';
        close.style.color = 'red';
        close.onclick = () => {
            categoriasElegidas.delete(valor);
            span.remove();
        };

        span.appendChild(close);
        contenedor.appendChild(span);
        input.value = '';
    }
}

function addNuevaFoto(evt) {
    evt.preventDefault();

    let div = document.querySelector('.fotos');

    // Creamos un contenedor div que engloba los dos campos
    let html = `
        <div class="campo-foto">
            <div class="form-group">
                <label for="photo">
                    <img src="images/not_found.png" alt="No hay foto" class="preview-img" onclick="activarSelector(event)">
                </label>
                <input type="file" class="fileInput" name="fotos[]" id = "fileInput" onchange="mostrarImagen(event)" multiple />
            </div>

            <div class="form-group">
                <label for="descripciones">Foto Descripción:</label>
                <textarea maxlength="200" name="descripciones[]" id="photo-des" placeholder="Descripción de la foto" required></textarea>

                <button type="button" onclick="document.querySelector('.fileInput').click()">
                    <span class="button_top">Seleccionar Foto</span>
                </button>

                <button type="button" id="delete" onclick="eliminarCampo(event)">
                    <span class="button_top">Eliminar</span>
                </button>
            </div>
        </div>`;

    div.insertAdjacentHTML('beforeend', html);
}

function activarSelector(event) {
    const inputFile = event.target.closest('.campo-foto').querySelector('.fileInput');
    inputFile.click();
}

function mostrarImagen(event) {
    var archivo = event.target.files[0];
    if (archivo) {
        // Verificamos si el tamaño del archivo es mayor a 200KB (200 * 1024 bytes)
        if (archivo.size > 200 * 1024) {
            mostrarDialogo("El archivo es demasiado grande. Por favor selecciona una imagen de menos de 200KB.");
            
            event.target.value = '';  // Limpiamos el input
            const imgElement = event.target.closest('.campo-foto').querySelector('img');
            imgElement.src = 'images/not_found.png'; 
        } else {
            // Si el archivo es válido, cargamos la imagen
            var reader = new FileReader();
            reader.onload = function(e) {
                // Actualizamos el src de la imagen con la URL de la imagen seleccionada
                const imgElement = event.target.closest('.campo-foto').querySelector('img');
                imgElement.src = e.target.result;
            };
            reader.readAsDataURL(archivo);
        }
    }
}

function eliminarCampo(event) {
    // Encontramos el contenedor 'campo-foto' y eliminamos ese bloque específico
    const campoFoto = event.target.closest('.campo-foto');
    campoFoto.remove();  // Elimina solo el bloque de foto y descripción correspondiente
}
