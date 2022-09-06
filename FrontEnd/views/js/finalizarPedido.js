const API_URL = "https://orquiweb.herokuapp.com";

function loadData() {
    loadTable();
    let mesa = localStorage.getItem('mesa');
    let total = localStorage.getItem('total');
    let mesero = sessionStorage.getItem('userId');
    let fecha = formatDate(new Date(Date.now()));    
    let data = {
        idMesa: mesa,
        totalComanda: total,
        idUsuario: mesero,
        fecha,
        estado: 'Pendiente'
    }
    fetch(`${API_URL}/mesero/comanda`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        response.json().then(function (result) {            
            let pedidos = JSON.parse(localStorage.getItem('carrito'));            
            pedidos.forEach(pedido =>{
                let data = {
                    idComanda: result.insertId,
                    idProducto: pedido.idProducto,
                    cantidad: pedido.cantidad,
                    totalProducto: (pedido.cantidad * pedido.costoUnidad)
                }                
                fetch(`${API_URL}/mesero/detalleComanda`, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            });
        });
    });
}

function loadTable(){
    let pedidos = JSON.parse(localStorage.getItem('carrito'));
    let tbody = document.getElementById('carrito');
    pedidos.forEach(pedido => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${pedido.nombre}</td>
            <td>${pedido.costoUnidad}</td>
            <td>${pedido.cantidad}</td>
            <td>${(pedido.cantidad)*pedido.costoUnidad}</td>
        `;
        tbody.appendChild(tr);
    });
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return [
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
        date.getFullYear(),
    ].join('/');
}

function cleanAllBack(){
    localStorage.clear();
    window.location.href = './views/home_mesero';
}
addEventListener('DOMContentLoaded', loadData);