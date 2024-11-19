document.getElementById("formLogin").addEventListener("submit", function(event) {
    event.preventDefault();
    const usuario = document.getElementById("username").value;
    const contraseña = document.getElementById("password").value;

    if (usuario === "admin" && contraseña === "1234") {
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
    } else {
        document.getElementById("loginError").style.display = "block";
    }
});

// Simulación de los datos de los sensores
const registros = { temperatura: [], humo: [], movimiento: [] };

// Función para agregar registros a la tabla
function agregarRegistro(tablaId, tipo, valor) {
    const tabla = document.getElementById(tablaId).querySelector("tbody");
    const fechaHora = new Date().toLocaleString();
    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${fechaHora}</td>
        <td>${valor}</td>
        <td><button class="eliminarRegistro">Eliminar</button></td>
    `;

    registros[tipo].push(fila);

    // Limitar el número de registros en la tabla (máximo 5)
    if (registros[tipo].length > 5) {
        const primerRegistro = registros[tipo].shift();
        primerRegistro.remove();
    }

    tabla.appendChild(fila);

    // Agregar funcionalidad de eliminar
    fila.querySelector(".eliminarRegistro").addEventListener("click", function() {
        fila.remove();
        registros[tipo].splice(registros[tipo].indexOf(fila), 1);
    });
}

// Función para actualizar los datos de los sensores en el dashboard
function actualizarDashboard() {
    const temperatura = (Math.random() * 5 + 20).toFixed(1) + " °C";
    const humo = (Math.random() * 100).toFixed(1) + " %";
    const movimiento = Math.random() > 0.5 ? "Detectado" : "No detectado";

    // Actualizar valores en el dashboard
    document.getElementById("temperaturaValue").innerText = temperatura;
    document.getElementById("humoValue").innerText = humo;
    document.getElementById("movimientoValue").innerText = movimiento;

    // Agregar registros a las tablas
    agregarRegistro("tablaTemperatura", "temperatura", temperatura);
    agregarRegistro("tablaHumo", "humo", humo);
    agregarRegistro("tablaMovimiento", "movimiento", movimiento);
}

// Funcionalidad para cambiar de vista (dashboard <-> registros)
document.getElementById("verRegistros").addEventListener("click", function() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("registros").style.display = "block";
});

document.getElementById("volverDashboard").addEventListener("click", function() {
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("registros").style.display = "none";
});

// Llamada inicial y actualización cada 3 segundos
setInterval(actualizarDashboard, 3000);
actualizarDashboard();