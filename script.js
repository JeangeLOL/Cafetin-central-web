var menu = [
    { id: 1, nombre: "☕ Café Marrón", precio: 1.5 },
    { id: 2, nombre: "🥟 Empanada de Carne", precio: 1.2 },
    { id: 3, nombre: "🧃 Jugo de Naranja", precio: 2.0 },
    { id: 4, nombre: "🍕 Slice Pizza", precio: 2.5 },
    { id: 5, nombre: "🥐 Cachito de Jamón", precio: 1.8 },
    { id: 6, nombre: "🥪 Sanduich de Pollo", precio: 3.0 },
    { id: 7, nombre: "🍔 Hamburguesa Simple", precio: 4.5 },
    { id: 8, nombre: "🥤 Malta Bien Fría", precio: 1.0 },
    { id: 9, nombre: "🍩 Dona de Chocolate", precio: 1.25 },
    { id: 10, nombre: "🥤 Refresco de Lata", precio: 1.5 }
];

var carrito = [];

var resenas = [
    { id: 101, usuario: "pedrito67", texto: "la empanada esta brutal" },
    { id: 102, usuario: "chamollero24", texto: "servicio malo, me dieron el cafe frío." },
    { id: 103, usuario: "alfonsoC0jio3", texto: "El cajero es un mierda de lo peor." }
];

// login
function intentarLogin() {
    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;

    if (user === "ClienteUCV" && pass === "Central_123") {
        cambiarSeccion("modulo-cliente");
        mostrarMenu();
    } else if (user === "adminRoot" && pass === "cafetinAdmin") {
        cambiarSeccion("modulo-admin");
        mostrarAdmin();
    } else if (user === "caja_01" && pass === "Cajero#123") {
        cambiarSeccion("modulo-caja");
        mostrarCaja();
    } else {
        alert("Acceso denegado");
    }
}

function cambiarSeccion(id) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("modulo-cliente").style.display = "none";
    document.getElementById("modulo-admin").style.display = "none";
    document.getElementById("modulo-caja").style.display = "none";
    
    document.getElementById(id).style.display = "block";
}

function cerrarSesion() { location.reload(); }

// cliente
function mostrarMenu() {
    var contenedor = document.getElementById("contenedor-productos");
    var molde = document.getElementById("molde-producto");
    contenedor.innerHTML = "";

    menu.forEach(function(p) {
        var clon = molde.content.cloneNode(true);
        clon.querySelector(".txt-nombre").innerText = p.nombre;
        clon.querySelector(".txt-precio").innerText = "$" + p.precio.toFixed(2);
        clon.querySelector(".btn-comprar").onclick = function() { comprar(p.id); };
        contenedor.appendChild(clon);
    });
}

function comprar(id) {
    var prod = menu.find(function(item) { return item.id === id; });
    carrito.push(prod);
    actualizarVistaCarrito();
}

function actualizarVistaCarrito() {
    document.getElementById("contador-productos").innerText = carrito.length;
    var detalle = document.getElementById("detalle-carrito");
    var totalTxt = document.getElementById("subtotal-carrito");
    detalle.innerHTML = "";
    var suma = 0;

    if (carrito.length === 0) {
        detalle.innerHTML = "<p>No hay productos aún.</p>";
    } else {
        carrito.forEach(function(p) {
            var pElement = document.createElement("p");
            pElement.innerText = "✅ " + p.nombre + " - $" + p.precio.toFixed(2);
            detalle.appendChild(pElement);
            suma += p.precio;
        });
    }
    totalTxt.innerText = suma.toFixed(2);
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío, pidete algo pue");
        return;
    }

    var total = carrito.reduce((acc, p) => acc + p.precio, 0);
    var fecha = new Date().toLocaleDateString();
    
    // ACTUALIZAR HISTORIAL VISUAL
    var listaH = document.getElementById("lista-historial");
    var itemH = document.createElement("p");
    var nombres = carrito.map(p => p.nombre).join(", ");
    itemH.innerHTML = `${fecha} - ${nombres} - $${total.toFixed(2)} (Pagado)`;
    listaH.prepend(itemH);

    alert(" ¡Compra realizada con éxito! \n" +
          "Total pagado: $" + total.toFixed(2) + "\n" +
          "Gracias por tu compra");

    carrito = [];
    actualizarVistaCarrito();
}

// admin
function mostrarAdmin() {
    var listaR = document.getElementById("lista-resenas");
    var moldeR = document.getElementById("molde-resena");
    listaR.innerHTML = "";

    resenas.forEach(function(r) {
        var clon = moldeR.content.cloneNode(true);
        clon.querySelector(".txt-usuario").innerText = r.usuario;
        clon.querySelector(".txt-comentario").innerText = r.texto;
        clon.querySelector(".btn-borrar-resena").onclick = function() { eliminarResena(r.id); };
        listaR.appendChild(clon);
    });

    var listaE = document.getElementById("lista-eliminar");
    listaE.innerHTML = "";
    menu.forEach(function(p) {
        var div = document.createElement("div");
        div.style = "display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #eee";
        div.innerHTML = "<span>" + p.nombre + "</span>";
        
        var btn = document.createElement("button");
        btn.innerText = "Eliminar";
        btn.style.background = "red";
        btn.onclick = function() { eliminarProducto(p.id); };
        
        div.appendChild(btn);
        listaE.appendChild(div);
    });
}

function agregarProducto() {
    var n = document.getElementById("nombre-producto").value;
    var p = parseFloat(document.getElementById("precio-producto").value);
    if (n && p) {
        menu.push({ id: Date.now(), nombre: n, precio: p });
        mostrarAdmin();
        alert("Producto agregado al sistema");
    }
}

function eliminarProducto(id) {
    menu = menu.filter(function(x) { return x.id !== id; });
    mostrarAdmin();
}

function eliminarResena(id) {
    resenas = resenas.filter(function(x) { return x.id !== id; });
    mostrarAdmin();
}

// caja
function mostrarCaja() {
    var lista = document.getElementById("lista-caja");
    lista.innerHTML = "";
    var t = 0;
    menu.slice(0, 2).forEach(function(p) {
        var li = document.createElement("li");
        li.innerText = p.nombre + " --- $" + p.precio;
        lista.appendChild(li);
        t += p.precio;
    });
    document.getElementById("total-caja").innerText = t.toFixed(2);
}

function emitirRecibo() { alert("Recibo generado correctamente."); }