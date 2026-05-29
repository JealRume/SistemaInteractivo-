// TASK 2: Selección de elementos usando dos métodos diferentes (Criterio de Aceptación)
const inputNota = document.getElementById("inputNota"); // Método 1: getElementById
const btnAgregar = document.querySelector("#btnAgregar"); // Método 2: querySelector
const listaNotas = document.getElementById("listaNotas");

// TASK 2: Inspección y confirmación de referencias en consola
console.log("--- Inicializando referencias del DOM ---");
console.log("Input text:", inputNota);
console.log("Botón agregar:", btnAgregar);
console.log("Lista UL:", listaNotas);

// TASK 5: Arreglo en memoria para almacenar las notas
let notas = [];

// Función para renderizar una sola nota en el DOM
const renderizarNotaEnDOM = (textoNota) => {
    // TASK 3: Creación del elemento LI
    const nuevoLi = document.createElement("li");
    
    // Creación del contenedor de texto
    const spanTexto = document.createElement("span");
    spanTexto.textContent = textoNota; // Uso de textContent (Criterio de Aceptación)
    
    // TASK 3: Creación del botón Eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.className = "btn-eliminar";

    // TASK 4: Evento para eliminar la nota al hacer click
    btnEliminar.addEventListener("click", () => {
        // Remover el nodo del DOM usando removeChild desde el padre (UL)
        listaNotas.removeChild(nuevoLi);
        console.log(`Nota eliminada del DOM: "${textoNota}"`);

        // TASK 5: Actualizar el arreglo filtrando la nota eliminada
        notas = notas.filter(nota => nota !== textoNota);
        
        // Guardar el estado actualizado en Local Storage
        guardarEnLocalStorage();
    });

    // Construcción del elemento e inserción en el DOM
    nuevoLi.appendChild(spanTexto);
    nuevoLi.appendChild(btnEliminar);
    listaNotas.appendChild(nuevoLi); // TASK 3: appendChild()
};

// TASK 5: Función para guardar el arreglo actual en Local Storage
const guardarEnLocalStorage = () => {
    localStorage.setItem("notas", JSON.stringify(notas));
    console.log("Estado de Local Storage actualizado:", notas);
};

// TASK 3: Evento para agregar notas al hacer click
btnAgregar.addEventListener("click", () => {
    const textoValidador = inputNota.value.trim();

    // Validación de campo vacío
    if (textoValidador === "") {
        alert("Por favor, escribe una nota válida. El campo no puede estar vacío.");
        return;
    }

    // Agregar la nota al arreglo en memoria
    notas.push(textoValidador);

    // Renderizar visualmente en el DOM
    renderizarNotaEnDOM(textoValidador);
    console.log(`Nota agregada con éxito: "${textoValidador}"`);

    // TASK 5: Persistir datos actualizados
    guardarEnLocalStorage();

    // Limpiar input y devolver el foco de escritura
    inputNota.value = "";
    inputNota.focus();
});

// TASK 5: Carga inicial de datos al abrir o recargar la página
const cargarNotasIniciales = () => {
    const notasGuardadas = localStorage.getItem("notas");

    if (notasGuardadas) {
        // Convertir el string JSON de vuelta a un arreglo de JS
        notas = JSON.parse(notasGuardadas);
        
        // Renderizar cada una de las notas recuperadas
        notas.forEach(nota => renderizarNotaEnDOM(nota));
        
        console.log(`Carga inicial exitosa: Se recuperaron ${notas.length} notas desde Local Storage.`);
    } else {
        console.log("No se encontraron notas guardadas previamente en Local Storage.");
    }
};

// Ejecución automática al cargar la página
cargarNotasIniciales();

