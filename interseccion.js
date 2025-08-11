// JavaScript code​​​​​​‌‌​‌‌‌​‌‌‌‌‌​‌​‌​‌​​‌​​​​ below
// Escribe tu respuesta aquí y luego prueba tu código.
// Tu tarea es implementar la función encontrarInterseccion().

// Cambia estos valores booleanos para controlar si ves
// la respuesta esperada y/o las pistas.
const mostrarResultadoEsperado = false;
const mostrarPistas = false;

function encontrarInterseccion(numeros1, numeros2) {
    // Convertir el primer arreglo a un Set para búsquedas más eficientes
    const conjunto1 = new Set(numeros1);
    
    // Crear un Set para almacenar la intersección (elimina duplicados automáticamente)
    const interseccion = new Set();
    
    // Iterar sobre el segundo arreglo y verificar si cada elemento existe en el primer conjunto
    for (const numero of numeros2) {
        if (conjunto1.has(numero)) {
            interseccion.add(numero);
        }
    }
    
    // Convertir el Set de intersección de vuelta a un arreglo
    return Array.from(interseccion);
}

// Ejemplos de prueba
console.log("=== Pruebas de la función encontrarInterseccion ===");

// Ejemplo 1 del enunciado (corregido)
const numeros1_ejemplo1 = [2, 4, 5, 20, 30, 56];
const numeros2_ejemplo1 = [5, 30, 100];
const resultado1 = encontrarInterseccion(numeros1_ejemplo1, numeros2_ejemplo1);
console.log("Ejemplo 1:");
console.log(`numeros1 = [${numeros1_ejemplo1}]`);
console.log(`numeros2 = [${numeros2_ejemplo1}]`);
console.log(`Resultado: [${resultado1}]`);
console.log(`Esperado: [5, 30]`);
console.log("✅", JSON.stringify(resultado1) === JSON.stringify([5, 30]));
console.log();

// Ejemplo 2: Sin intersección
const numeros1_ejemplo2 = [1, 2, 3];
const numeros2_ejemplo2 = [4, 5, 6];
const resultado2 = encontrarInterseccion(numeros1_ejemplo2, numeros2_ejemplo2);
console.log("Ejemplo 2 (sin intersección):");
console.log(`numeros1 = [${numeros1_ejemplo2}]`);
console.log(`numeros2 = [${numeros2_ejemplo2}]`);
console.log(`Resultado: [${resultado2}]`);
console.log(`Esperado: []`);
console.log("✅", JSON.stringify(resultado2) === JSON.stringify([]));
console.log();

// Ejemplo 3: Con números negativos
const numeros1_ejemplo3 = [-1, 0, 1, 2, -5];
const numeros2_ejemplo3 = [-1, 3, 1, -5, 8];
const resultado3 = encontrarInterseccion(numeros1_ejemplo3, numeros2_ejemplo3);
console.log("Ejemplo 3 (números negativos):");
console.log(`numeros1 = [${numeros1_ejemplo3}]`);
console.log(`numeros2 = [${numeros2_ejemplo3}]`);
console.log(`Resultado: [${resultado3}]`);
console.log(`Esperado: [-1, 1, -5]`);
console.log("✅", resultado3.sort().toString() === [-1, 1, -5].sort().toString());
console.log();

// Ejemplo 4: Con duplicados
const numeros1_ejemplo4 = [1, 2, 2, 3, 4];
const numeros2_ejemplo4 = [2, 2, 3, 5, 6];
const resultado4 = encontrarInterseccion(numeros1_ejemplo4, numeros2_ejemplo4);
console.log("Ejemplo 4 (con duplicados):");
console.log(`numeros1 = [${numeros1_ejemplo4}]`);
console.log(`numeros2 = [${numeros2_ejemplo4}]`);
console.log(`Resultado: [${resultado4}]`);
console.log(`Esperado: [2, 3] (sin duplicados)`);
console.log("✅", resultado4.sort().toString() === [2, 3].sort().toString());
console.log();

// Ejemplo 5: Arreglos vacíos
const numeros1_ejemplo5 = [];
const numeros2_ejemplo5 = [1, 2, 3];
const resultado5 = encontrarInterseccion(numeros1_ejemplo5, numeros2_ejemplo5);
console.log("Ejemplo 5 (arreglo vacío):");
console.log(`numeros1 = [${numeros1_ejemplo5}]`);
console.log(`numeros2 = [${numeros2_ejemplo5}]`);
console.log(`Resultado: [${resultado5}]`);
console.log(`Esperado: []`);
console.log("✅", JSON.stringify(resultado5) === JSON.stringify([]));

// Análisis de complejidad
console.log("\n=== Análisis de Complejidad ===");
console.log("Complejidad temporal: O(n + m)");
console.log("- n = longitud del primer arreglo");
console.log("- m = longitud del segundo arreglo");
console.log("Complejidad espacial: O(min(n, m))");
console.log("- Para almacenar el Set y el resultado");
