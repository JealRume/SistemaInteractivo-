/**
 * APLICACIÓN WEB INTEGRAL - GESTOR DE TAREAS
 * Lógica de interacción, persistencia y Fetch API
 */

// --- 1. CONFIGURACIÓN GLOBAL Y VARIABLES ---
const API_URL = 'https://typicode.com';
let tasksArray = []; // Arreglo global para almacenar los datos

// Referencias del DOM
const todoForm = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const errorMessage = document.getElementById('errorMessage');
const syncApiBtn = document.getElementById('syncApiBtn');

// --- 2. PERSISTENCIA EN LOCAL STORAGE (TASK 4) ---

// Guarda el estado actual del arreglo global en Local Storage
const saveToLocalStorage = () => {
    localStorage.setItem('userTasks', JSON.stringify(tasksArray));
    console.log('%c[Local Storage] Datos actualizados:', 'color: #00bcd4', tasksArray);
};

// Carga los datos almacenados al inicializar la app
const loadFromLocalStorage = () => {
    const storedTasks = localStorage.getItem('userTasks');
    if (storedTasks) {
        tasksArray = JSON.parse(storedTasks);
        console.log('[Local Storage] Datos recuperados con éxito.');
        renderTasks();
    }
};

// --- 3. MANIPULACIÓN DEL DOM (TASK 3) ---

// Renderiza todas las tareas presentes en el arreglo global
const renderTasks = () => {
    taskList.innerHTML = ''; // Limpia la lista antes de volver a dibujar

    tasksArray.forEach(task => {
        // Crear elemento li
        const li = document.createElement('li');
        li.id = `task-${task.id}`;
        
        // Crear contenedor de texto
        const textSpan = document.createElement('span');
        textSpan.textContent = task.title;
        li.appendChild(textSpan);

        // Crear botón Eliminar
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.style.backgroundColor = '#f44336';
        deleteBtn.style.color = 'white';
        deleteBtn.style.border = 'none';
        deleteBtn.style.borderRadius = '3px';
        
        // Evento de eliminación (TASK 3 & TASK 5 - DELETE)
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        li.appendChild(deleteBtn);
        taskList.appendChild(li); // appendChild para modificar el DOM
    });
};

// --- 4. CAPTURA Y VALIDACIÓN DE DATOS (TASK 2) ---

todoForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita la recarga de página
    
    const taskText = taskInput.value.trim();

    // Validación elemental
    if (taskText === '') {
        errorMessage.style.display = 'block';
        console.warn('[Validación] Intento de agregar tarea vacía.');
        return;
    }
    
    errorMessage.style.display = 'none';

    // Objeto de la nueva tarea
    const newTask = {
        id: Date.now(), // ID temporal único basado en tiempo
        title: taskText,
        completed: false
    };

    // Agregar al flujo local de datos
    tasksArray.push(newTask);
    renderTasks();
    saveToLocalStorage();
    
    taskInput.value = ''; // Limpiar campo de texto

    // Intentar sincronizar creación con servidor remoto (TASK 5 - POST)
    await createInApi(newTask);
});

// --- 5. INTEGRACIÓN CON FETCH API - OPERACIONES CRUD (TASK 5) ---

// GET: Obtener tareas desde el servidor externo
const fetchTasksFromApi = async () => {
    try {
        console.log('[API] Iniciando solicitud GET...');
        const response = await fetch(`${API_URL}?_limit=5`); // Limitado a 5 items de prueba
        
        if (!response.ok) throw new Error('Error al conectar con el servidor');
        
        const data = await response.json();
        console.log('%c[API] Respuesta GET exitosa:', 'color: #4caf50', data);

        // Combinar datos externos con locales
        tasksArray = [...tasksArray, ...data];
        renderTasks();
        saveToLocalStorage();
    } catch (error) {
        console.error('[API Error] Ocurrió un fallo en GET:', error.message);
    }
};

// POST: Enviar nueva tarea al servidor ficticio
const createInApi = async (taskData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(taskData),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });

        if (!response.ok) throw new Error('Error al procesar el guardado remoto');

        const result = await response.json();
        console.log('%c[API] Respuesta POST exitosa:', 'color: #4caf50', result);
    } catch (error) {
        console.error('[API Error] Ocurrió un fallo en POST:', error.message);
    }
};

// DELETE: Eliminar una tarea localmente y notificar a la API
const deleteTask = async (id) => {
    try {
        // Encontrar elemento en el DOM y removerlo con removeChild
        const elementToRemove = document.getElementById(`task-${id}`);
        if (elementToRemove) {
            taskList.removeChild(elementToRemove);
        }

        // Remover del arreglo global y actualizar persistencia local
        tasksArray = tasksArray.filter(task => task.id !== id);
        saveToLocalStorage();

        console.log(`[DOM / Local Storage] Elemento con ID: ${id} removido.`);

        // Petición DELETE simulada a la API
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        
        if (!response.ok) throw new Error('Error al borrar en el servidor');
        
        console.log(`%c[API] Respuesta DELETE exitosa para ID: ${id}`, 'color: #e91e63');
    } catch (error) {
        console.error('[API Error] Ocurrió un fallo en DELETE:', error.message);
    }
};

// --- 6. EVENTOS DE INICIALIZACIÓN ---
syncApiBtn.addEventListener('click', fetchTasksFromApi);

// Ejecución inicial al cargar la ventana
window.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
});
