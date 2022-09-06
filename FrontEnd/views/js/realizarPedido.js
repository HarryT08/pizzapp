const API_URL = "https://orquiweb.herokuapp.com";

function loadData() {
    $.ajax({
        type: 'GET',
        url: `${API_URL}/admin/producto`,
        async: true,
        cache: false,
        success: function (data) {
            let tbody = document.getElementById('productos');
            data.forEach(producto => {
                let tr = document.createElement('tr');
                tr.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.costoUnidad}</td>
                <td class="nk-tb-col nk-tb-col-tools">
                    <button onclick="agregarCarrito(${producto.idProducto})" class="btn btn-dim btn-success">Agregar</button>
                </td>
            `;
                tbody.appendChild(tr);
            });
        }
    });
    document.getElementById('alert-carrito').style.display = 'none';
}

function volver(){
    localStorage.clear();
    window.location.href = './views/home_mesero'
}

function agregarCarrito(id) {
    $.ajax({
        type: 'GET',
        url: `${API_URL}/admin/producto/${id}`,
        async: true,
        cache: false,
        success: function (data) {
            guardarLocalStorage(data);
            getTotal();
            pintarCarrito();
        }
    });
}

function pintarCarrito() {
    let pedidos = getLocalStorage();
    let table = document.getElementById('carrito');
    table.innerHTML = '';
    pedidos.map(pedido => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${pedido.nombre}</td>
            <td>${pedido.costoUnidad}</td>
            <td>${pedido.cantidad}</td>
            <td>
                <button onclick="getMore(${pedido.idProducto})" class="btn btn-outline-success">+</button>
                <button onclick="getLess(${pedido.idProducto})" class="btn btn-outline-danger">-</button>
            </td>
        `;
        table.appendChild(row);
    });
}

function getTotal(){
    let pedidos = getLocalStorage();
    let total = 0;
    pedidos.forEach(pedido => {
        total += pedido.cantidad * pedido.costoUnidad;
    });
    if(total === 0){
        localStorage.removeItem('total');
    }else{
        localStorage.setItem('total',total);
    }
}

function getMore(idProducto) {
    let pedidos = getLocalStorage();
    pedidos.forEach(pedido => {
        if (pedido.idProducto === idProducto) {
            pedido.cantidad += 1;
            localStorage.setItem('carrito', JSON.stringify(pedidos));
            getTotal();
            pintarCarrito();
        }
    });    
}

function getLess(idProducto) {
    let pedidos = getLocalStorage();
    pedidos.forEach(function (pedido, indice, array) {
        if (pedido.idProducto === idProducto) {
            pedido.cantidad -= 1;
            if(pedido.cantidad === 0){
                pedidos.splice(indice);
            }            
            localStorage.setItem('carrito', JSON.stringify(pedidos));
            vaciarCarrito();
            getTotal();
            pintarCarrito();
        }
    });
}

function vaciarCarrito(){
    let pedidos = getLocalStorage();
    if(pedidos.length === 0){
        localStorage.removeItem('carrito');
    }
}

function guardarLocalStorage(data) {
    let pedidos = getLocalStorage();
    let modif = false;
    pedidos.forEach(pedido => {
        if (pedido.idProducto === data[0].idProducto) {
            pedido.cantidad += 1;
            localStorage.setItem('carrito', JSON.stringify(pedidos));
            modif = true;
        }
    });
    if (!modif) {
        data[0].cantidad = 1;
        pedidos.push(data[0]);
        localStorage.setItem('carrito', JSON.stringify(pedidos));
    }
}

function getLocalStorage() {
    let pedido;
    if (localStorage.getItem('carrito') === null) {
        pedido = [];
    } else {
        pedido = JSON.parse(localStorage.getItem('carrito'));
    }

    return pedido;
}

function finalizar(){
    let pedidos = getLocalStorage();
    if(pedidos.length > 0){
        window.location.href = './views/finalizarPedido';
    }else{
        document.getElementById('alert-carrito').style.display = '';
    }
}

document.addEventListener("DOMContentLoaded", loadData());