/**
 * ARCHIVO: sistema_interactivo.js
 * OBJETIVO: Controlar la interfaz gráfica usando Objetos, Sets y Maps en JS.
 */

// ==========================================
// ESTADOS ESTRUCTURAS DE DATOS (Const & Let)
// ==========================================
const inventarioProductos = {}; // TASK 1: Objeto base
const numerosSet = new Set([10, 20, 30, 20, 10]); // TASK 2: Set con duplicados iniciales
const categoriasMap = new Map(); // TASK 3: Map asociativo

// ==========================================
// VALIDACIONES (TASK 5)
// ==========================================
function validarCampos(id, nombre, precio) {
    if (!id.trim() || inventarioProductos[id]) return "ID vacío o ya existente.";
    if (!nombre.trim()) return "El nombre no puede estar vacío.";
    if (isNaN(precio) || precio <= 0) return "El precio debe ser un número mayor a 0.";
    return null; // Datos correctos
}

// ==========================================
// FUNCIONES DE RENDERIZADO / ITERACIONES (TASK 4)
// ==========================================

// 1. Dibujar Objeto en pantalla usando for...in
function renderObjeto() {
    const lista = document.getElementById("listaObjetos");
    lista.innerHTML = "";
    
    for (const id in inventarioProductos) {
        const li = document.createElement("li");
        li.textContent = `[${id}] ${inventarioProductos[id].nombre} - $${inventarioProductos[id].precio}`;
        lista.appendChild(li);
    }

    // Demostración de métodos del objeto requeridos en consola
    console.log("Keys:", Object.keys(inventarioProductos));
    console.log("Values:", Object.values(inventarioProductos));
}

// 2. Dibujar Set en pantalla usando for...of
function renderSet() {
    const contenedor = document.getElementById("vistaSet");
    contenedor.innerHTML = "";

    for (const num of numerosSet) {
        const span = document.createElement("span");
        span.className = "badge";
        span.textContent = num;
        contenedor.appendChild(span);
    }
}

// 3. Dibujar Map en pantalla usando forEach()
function renderMap() {
    const lista = document.getElementById("listaMap");
    lista.innerHTML = "";

    categoriasMap.forEach((producto, categoria) => {
        const li = document.createElement("li");
        li.innerHTML = `Categoría <b>${categoria}</b>: ${producto}`;
        lista.appendChild(li);
    });
}

// Ejecución masiva de renderizados para refrescar la interfaz
function actualizarInterfaz() {
    renderObjeto();
    renderSet();
    renderMap();
}

// ==========================================
// ESCUCHADORES DE EVENTOS / INTERACCIÓN
// ==========================================

// Formulario: Guardar Producto (Objeto y Map)
document.getElementById("productForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("prodId").value;
    const nombre = document.getElementById("prodNombre").value;
    const precio = parseFloat(document.getElementById("prodPrecio").value);
    const categoria = document.getElementById("prodCategoria").value;
    const errorDiv = document.getElementById("errorMsg");

    const error = validarCampos(id, nombre, precio);
    if (error) {
        errorDiv.textContent = error;
        return;
    }
    errorDiv.textContent = ""; // Limpiar errores

    // Guardar en Objeto (TASK 1)
    inventarioProductos[id] = { nombre, precio };

    // Guardar en Map (TASK 3)
    categoriasMap.set(categoria, nombre);

    // Resetear formulario y actualizar pantalla
    document.getElementById("productForm").reset();
    actualizarInterfaz();
});

// Set: Botón Añadir (.add())
document.getElementById("addSetBtn").addEventListener("click", () => {
    const input = document.getElementById("setNumber");
    const feedback = document.getElementById("setFeedback");
    const valor = parseInt(input.value);

    if (!isNaN(valor)) {
        numerosSet.add(valor); // Añadir al Set
        feedback.textContent = `Añadido: ${valor}`;
        input.value = "";
        actualizarInterfaz();
    }
});

// Set: Botón Eliminar (.delete() y .has())
document.getElementById("deleteSetBtn").addEventListener("click", () => {
    const input = document.getElementById("setNumber");
    const feedback = document.getElementById("setFeedback");
    const valor = parseInt(input.value);

    if (numerosSet.has(valor)) { // Verificar existencia
        numerosSet.delete(valor); // Eliminar
        feedback.textContent = `Eliminado: ${valor}`;
    } else {
        feedback.textContent = `El número ${valor} no existe en el Set.`;
    }
    input.value = "";
    actualizarInterfaz();
});

// Carga Inicial del Sistema al abrir el navegador
window.addEventListener("DOMContentLoaded", () => {
    console.log("Set inicial con duplicados filtrados automáticamente:");
    console.log(numerosSet); // Muestra en consola el comportamiento nativo del Set
    actualizarInterfaz();
});
