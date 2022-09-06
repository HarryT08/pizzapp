const API_URL = "https://orquiweb.herokuapp.com";

function loadData() {
    loadReservas();
    loadOrders();
    loadTable();
}

function loadReservas() {
    let fecha = formatDate(new Date(Date.now()));
    let data = { fecha: fecha };
    $.ajax({
        type: 'GET',
        url: `${API_URL}/admin/reservaCount`,
        async: true,
        cache: false,
        data: data,
        success: function (data) {
            document.getElementById('reserva').innerHTML = data;
        }
    })
}

function loadOrders() {
    let fecha = formatDate(new Date(Date.now()));
    let data = { fecha: fecha };
    $.ajax({
        type: 'GET',
        url: `${API_URL}/admin/comandaCount`,
        async: true,
        cache: false,
        data: data,
        success: function (data) {
            document.getElementById('orders').innerHTML = data;
        }
    })
}

function loadTable() {
    let table = document.getElementById('table');
    $.ajax({
        type: 'GET',
        url: `${API_URL}/admin/comandaLast`,
        async: true,
        cache: false,
        success: function (data) {
            let table = document.getElementById('usuarios');
            data.forEach(result => {
                let tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${result.idComanda}</td>
                    <td>${result.fecha}</td>
                    <td>${result.totalComanda}</td>
                    <td>${result.estado}</td>
                `;
                table.appendChild(tr);
            })
        }
    })
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

document.addEventListener("DOMContentLoaded", loadData());