document.addEventListener("DOMContentLoaded", function () {

    const enlaces = document.querySelectorAll('a[href^="#"]');

    enlaces.forEach(function (enlace) {

        enlace.addEventListener("click", function (evento) {

            const destino = enlace.getAttribute("href");

            if (!destino || destino === "#") {
                return;
            }

            const seccion = document.querySelector(destino);

            if (seccion) {
                evento.preventDefault();

                seccion.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });

});

/* BOTÓN FLOTANTE VOLVER ARRIBA */

const botonVolverArriba = document.getElementById("volver-arriba");

if (botonVolverArriba) {

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            botonVolverArriba.classList.add("visible");
        } else {
            botonVolverArriba.classList.remove("visible");
        }
    });

    botonVolverArriba.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

}

/* BUSCADOR DE PRODUCTOS */

const buscadorProductos = document.getElementById("buscador-productos");

if (buscadorProductos) {
    buscadorProductos.addEventListener("keydown", function (evento) {
        if (evento.key === "Enter") {
            const texto = buscadorProductos.value.trim().toLowerCase();

            const productos = document.querySelectorAll(
                "#productos .producto"
            );

            let encontrado = false;

            productos.forEach(function (producto) {
                const titulo = producto.querySelector("h3");

                if (
                    !encontrado &&
                    titulo &&
                    titulo.textContent.toLowerCase().includes(texto) &&
                    texto !== ""
                ) {
                    producto.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                    encontrado = true;
                }
            });

            if (!encontrado && texto !== "") {
                alert("No encontramos ese producto. Intenta con otro nombre.");
            }
        }
    });
}

/* BOTÓN DE LA LUPA */

const botonBuscar = document.getElementById("boton-buscar");
const campoBuscar = document.getElementById("buscador-productos");

function buscarProducto() {
    const texto = campoBuscar.value.trim().toLowerCase();

    if (texto === "") {
        campoBuscar.focus();
        return;
    }

    const productos = document.querySelectorAll("#productos .producto");

    let productoEncontrado = null;

    productos.forEach(function (producto) {
        const titulo = producto.querySelector("h3");

        if (
            !productoEncontrado &&
            titulo &&
            titulo.textContent.toLowerCase().includes(texto)
        ) {
            productoEncontrado = producto;
        }
    });

    if (productoEncontrado) {
        productoEncontrado.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    } else {
        alert("No encontramos ese producto. Prueba con otro nombre.");
    }
}

if (botonBuscar && campoBuscar) {
    botonBuscar.addEventListener("click", buscarProducto);

    campoBuscar.addEventListener("keydown", function (evento) {
        if (evento.key === "Enter") {
            buscarProducto();
        }
    });
}

/* BOTÓN VER MÁS Y VER MENOS */

function verMasProductos() {
    const productos = document.querySelectorAll(
        "#productos .producto"
    );

    const boton = document.getElementById("boton-ver-mas");

    const mostrandoTodos = boton.dataset.todos === "true";

    productos.forEach(function (producto, indice) {
        if (indice >= 4) {
            producto.style.display = mostrandoTodos ? "none" : "block";
        }
    });

    if (mostrandoTodos) {
        boton.textContent = "Ver más productos ↓";
        boton.dataset.todos = "false";
    } else {
        boton.textContent = "Ver menos productos ↑";
        boton.dataset.todos = "true";
    }
}

/* CARRITO DE COMPRAS DE MICHIGURUMIS */

let carrito = [];

function agregarAlCarrito(nombre, precio) {
    const productoExistente = carrito.find(
        producto => producto.nombre === nombre
    );

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    actualizarCarrito();
    alert(nombre + " se agregó al carrito 🧸");
}

 function actualizarCarrito() {
    const contador = document.querySelector(".carrito");
    const lista = document.getElementById("lista-carrito");
    const totalTexto = document.getElementById("total-carrito");

    const cantidadTotal = carrito.reduce(
        (total, producto) => total + producto.cantidad, 0
    );

    if (contador) {
        contador.textContent = "🛒 " + cantidadTotal;
    }

    if (lista) {
        lista.innerHTML = "";

        if (carrito.length === 0) {
            lista.innerHTML = "<p>Tu carrito está vacío 🧸</p>";
        } else {
            carrito.forEach(function(producto) {
                const elemento = document.createElement("div");

                const subtotal = producto.precio * producto.cantidad;

                elemento.style.padding = "12px 0";
                elemento.style.borderBottom = "1px solid #edcbd9";

                const nombre = document.createElement("strong");
                nombre.textContent = producto.nombre;

                const detalle = document.createElement("p");
                detalle.textContent = "Cantidad: " + producto.cantidad;

                const precio = document.createElement("p");
                precio.textContent = "Precio: Bs " + producto.precio;

                const importe = document.createElement("p");
                importe.textContent = "Subtotal: Bs " + subtotal;

                elemento.append(nombre, detalle, precio, importe);
                lista.appendChild(elemento);
            });
        }
    }

    if (totalTexto) {
        const total = carrito.reduce(
    (suma, producto) =>
        suma + producto.precio * producto.cantidad,
    0
);

        totalTexto.textContent = "Bs " + total;
    }
}

/* ABRIR Y CERRAR LA VENTANA DEL CARRITO */

const botonAbrirCarrito = document.getElementById("abrir-carrito");
const ventanaCarrito = document.getElementById("ventana-carrito");
const botonCerrarCarrito = document.getElementById("cerrar-carrito");

if (botonAbrirCarrito && ventanaCarrito) {
    botonAbrirCarrito.addEventListener("click", function () {
        ventanaCarrito.classList.add("carrito-visible");
    });
}

if (botonCerrarCarrito && ventanaCarrito) {
    botonCerrarCarrito.addEventListener("click", function () {
        ventanaCarrito.classList.remove("carrito-visible");
    });
}

/* BOTÓN PARA VACIAR EL CARRITO */

const botonVaciarCarrito = document.getElementById("vaciar-carrito");

if (botonVaciarCarrito) {
    botonVaciarCarrito.addEventListener("click", function () {
        carrito = [];
        actualizarCarrito();
    });
}

/* HACER PEDIDOS POR WHATSAPP */

const botonComprarWhatsApp = document.getElementById("comprar-whatsapp");

if (botonComprarWhatsApp) {
    botonComprarWhatsApp.addEventListener("click", function () {
        if (carrito.length === 0) {
            alert("Tu carrito está vacío. Agrega un amigurumi primero 🧸");
            return;
        }

        let mensaje = "¡Hola! 💗 Quiero hacer un pedido de Michigurumis Chenille:\n\n";

        carrito.forEach(function (producto) {
            mensaje += "🧸 " + producto.nombre +
                " - Cantidad: " + producto.cantidad +
                " - Subtotal: Bs " +
                (producto.precio * producto.cantidad) + "\n";
        });

        const total = carrito.reduce(function (suma, producto) {
            return suma + producto.precio * producto.cantidad;
        }, 0);

        mensaje += "\n💰 Total del pedido: Bs " + total;
        mensaje += "\n\n¿Podrían confirmarme la disponibilidad? 💕";

        const enlace = "https://wa.me/59174653974?text=" +
            encodeURIComponent(mensaje);

        window.open(enlace, "_blank");
    });
}