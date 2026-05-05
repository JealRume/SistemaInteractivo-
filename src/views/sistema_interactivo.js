/**
 * SISTEMA INTERACTIVO DE MENSAJES - M3S1
 * Proyecto para practicar variables, tipos de datos y condicionales.
 */

// Función principal envuelta en un evento de clic para el botón
document.getElementById("btnIniciar").addEventListener("click", () => {
    
    // TASK 2: Entrada de datos del usuario
    // Se usa const para valores que no deberían reasignarse durante el proceso
    const nameRegister = prompt("Please, register name:");
    const oldRegister = prompt("Please, register years old:");

    // Convertimos la edad a un tipo de dato número para la validación
    const oldNumerical = Number(oldRegister);

    // TASK 3: Validación de la edad
    // isNaN verifica si el valor NO es un número
    if (isNaN(oldNumerical) || oldRegister === "" || oldRegister === null) {
        console.error("Error: Please, enter a valid old in numbers.");
        alert("Error: Please, enter a valid old in numbers.");
        return; // Detiene la ejecución si hay error
    }

    // TASK 4: Condicionales y mensajes dinámicos
    let finalMessage = "";

    if (oldNumerical < 18) {
        // Mensaje para menores de edad
        finalMessage = `Hi ${nameRegister}, You are underage. ¡No puedes ingresar a este sitio web!`;
        alert(finalMessage);
        console.log(finalMessage);
    } else {
        // Mensaje para mayores de edad (18 o más)
        finalMessage = `Hola ${nameRegister}, You are of legal age. ¡Welcome to the system!`;
        alert(finalMessage);
        console.log(finalMessage);
    }

    // Mostrar el resultado también en el HTML (Opcional)
    document.getElementById("result").innerText = finalMessage;
});