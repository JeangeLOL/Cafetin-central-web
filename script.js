// 1. DATOS
let menu = [
    { id: 1, nombre: "☕ Café Marrón", precio: 1.5 },
    { id: 2, nombre: "🥟 Empanada de Carne", precio: 1.2 },
    { id: 3, nombre: "🧃 Jugo de Naranja", precio: 2.0 },
    { id: 4, nombre: "🍕 Slice Pizza", precio: 2.5 }
];
let carrito = [];

let resenas = [
    { id: 101, usuario: "pedrito67", texto: "la empanada esta brutal" },
    { id: 102, usuario: "chamollero24", texto: "servicio malo, me dieron el cafe frío." },
    { id: 103, usuario: "alfonsoC0jio3", texto: "El cajero es un mierda de lo peor, no vengan." }
];


// 2. LOGIN
function intentarLogin() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user === "ClienteUCV" && pass === "Central_123") {
        entrarAModulo("modulo-cliente");
        mostrarMenu();
    } else if (user === "adminRoot" && pass === "cafetinAdmin") {
        entrarAModulo("modulo-admin");
        mostrarAdmin();
    } else if (user === "caja_01" && pass === "Cajero#123") {
        entrarAModulo("modulo-caja");
        mostrarCaja();
    } else {
        alert("Usuario o clave incorrectos");
    }
}

function entrarAModulo(id) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById(id).style.display = "block";
}

function cerrarSesion() { location.reload(); }

// 3. CLIENTE
function mostrarMenu() {
    let contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";
    menu.forEach(p => {
        // Creamos el HTML usando la clase CSS que definimos arriba
        contenedor.innerHTML += `
            <div class="tarjeta-producto">
                <h4>${p.nombre}</h4>
                <p>$${p.precio.toFixed(2)}</p>
                <button class="btn-comprar" onclick="comprar(${p.id})">Añadir</button>
            </div>`;
    });
}

function comprar(id) {
    let producto = menu.find(p => p.id === id);
    carrito.push(producto);
    actualizarCarrito();
}

function actualizarCarrito() {
    document.getElementById("contador-productos").innerText = carrito.length;
    let detalle = document.getElementById("detalle-carrito");
    let totalSpan = document.getElementById("subtotal-carrito");
    detalle.innerHTML = "";
    let subtotal = 0;
    carrito.forEach(p => {
        detalle.innerHTML += `<p>✅ ${p.nombre} - $${p.precio}</p>`;
        subtotal += p.precio;
    });
    totalSpan.innerText = subtotal.toFixed(2);
}

// 4. CAJA (Simulación de venta)
function mostrarCaja() {
    let lista = document.getElementById("lista-caja");
    lista.innerHTML = "";
    let total = 0;
    // Simulamos que el cajero está viendo el pedido actual del cliente
    menu.slice(0, 2).forEach(p => {
        lista.innerHTML += `<li>${p.nombre} --- $${p.precio}</li>`;
        total += p.precio;
    });
    document.getElementById("total-caja").innerText = total.toFixed(2);
}

function emitirRecibo() {
    alert("Recibo Emitido ¡Gracias por su compra!");
}

function mostrarAdmin() {
    // 1. Dibujar productos (lo que ya tenías)
    let listaProds = document.getElementById("lista-eliminar");
    listaProds.innerHTML = "";
    menu.forEach(p => {
        listaProds.innerHTML += `
            <div style="display:flex; justify-content:space-between; background:#f9f9f9; padding:10px; margin:5px; border-radius:8px;">
                <span>${p.nombre} ($${p.precio})</span>
                <button onclick="eliminarProducto(${p.id})" style="background:red; padding:5px 10px;">Eliminar</button>
            </div>`;
    });

    // 2. PIEZA NUEVA: Dibujar reseñas
    let contenedorResenas = document.getElementById("lista-resenas");
    contenedorResenas.innerHTML = "";
    resenas.forEach(r => {
        contenedorResenas.innerHTML += `
            <div style="background: #fff5f5; border-left: 5px solid #ff4444; padding: 10px; margin: 10px 0; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong style="color: #cc0000;">${r.usuario}:</strong> 
                    <span style="font-style: italic;">"${r.texto}"</span>
                </div>
                <button onclick="eliminarResena(${r.id})" style="background: #cc0000; color: white; padding: 5px 10px; font-size: 0.8em;">Borrar</button>
            </div>`;
    });
}
function agregarProducto() {
    let nombre = document.getElementById("nombre-producto").value;
    let precio = parseFloat(document.getElementById("precio-producto").value);
    if (nombre && precio) {
        menu.push({ id: Date.now(), nombre: nombre, precio: precio });
        alert("Producto añadido");
        mostrarAdmin();
        document.getElementById("form-nuevo-producto").reset();
    }
}

function eliminarProducto(id) {
    menu = menu.filter(p => p.id !== id);
    mostrarAdmin();
}
function eliminarResena(id) {
    // Filtramos la lista para quitar la que tenga el ID que tocamos
    resenas = resenas.filter(r => r.id !== id);
    alert("Reseña eliminada por violar las normas.");
    mostrarAdmin(); // Volvemos a dibujar para que desaparezca de la vista
}    

