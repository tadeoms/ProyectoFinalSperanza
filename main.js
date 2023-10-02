document.addEventListener("DOMContentLoaded", () => {
    const carrito = [];
    const listaProductos = document.getElementById("productos");
    const listaCarrito = document.querySelector("#carrito ul");
    const totalCarrito = document.getElementById("total");
    const vaciarCarritoBtn = document.getElementById("vaciarCarrito");

    fetch("productos.json")
        .then(response => response.json())
        .then(data => {
            const productos = data;

            const mostrarProductos = () => {
                listaProductos.innerHTML = "";
                productos.forEach(producto => {
                    const card = document.createElement("div");
                    card.classList.add("producto");
                    card.innerHTML = `
                        <h3>${producto.nombre}</h3>
                        <p>Precio: $${producto.precio}</p>
                        <button data-id="${producto.id}" class="agregarCarrito">Agregar al Carrito</button>
                    `;
                    listaProductos.appendChild(card);
                });
            };

            const actualizarCarrito = () => {
                listaCarrito.innerHTML = "";
                let total = 0;
                carrito.forEach(item => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `${item.nombre} - $${item.precio}`;
                    listaCarrito.appendChild(listItem);
                    total += item.precio;
                });
                totalCarrito.textContent = total;
            };

            listaProductos.addEventListener("click", (e) => {
                if (e.target.classList.contains("agregarCarrito")) {
                    const productId = parseInt(e.target.getAttribute("data-id"));
                    const productoSeleccionado = productos.find(producto => producto.id === productId);
                    if (productoSeleccionado) {
                        carrito.push(productoSeleccionado);
                        actualizarCarrito();
                    }
                }
            });

            vaciarCarritoBtn.addEventListener("click", () => {
                swal({
                    title: "¿Estás seguro?",
                    text: "¿Quieres vaciar el carrito?",
                    icon: "warning",
                    buttons: {
                        cancel: "Cancelar",
                        confirm: "Vaciar"
                    },
                }).then((confirm) => {
                    if (confirm) {
                        carrito.length = 0;
                        actualizarCarrito();
                        swal("¡Carrito vaciado!", "El carrito de compra ha sido vaciado con éxito.", "success");
                    }
                });
            });

            mostrarProductos();
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
        });
});