const API_URL = "https://orquiweb.herokuapp.com";

function loadData() {
    $.ajax({
        type: 'GET',
        url: `${API_URL}/admin/mesa/libre`,
        async: true,
        cache: false,
        success: function (data) {
            if (data.length === 0) {
                const table = document.getElementById("view");
                let row = document.createElement("tr");
                const mesa = document.createElement("td");
                mesa.innerHTML = "No hay mesas disponibles para hacer pedidos";
                row.appendChild(mesa);
                table.appendChild(row);
            } else {
                const table = document.getElementById("view");
                let row = document.createElement("tr");
                for (let i = 0; i < data.length; i++) {
                    let id_mesa = `${data[i].idMesa}`;
                    const mesa = document.createElement("td");
                    const btnMesa = document.createElement("button");
                    btnMesa.onclick = guardarId;
                    btnMesa.innerHTML = id_mesa;
                    btnMesa.id = id_mesa;
                    verifyTime(id_mesa, (result) => {
                        btnMesa.classList.add(result);
                    });                    
                    mesa.appendChild(btnMesa);
                    row.appendChild(mesa);
                    if (((i + 1) % 4) === 0 || (i + 1) === data.length) {
                        table.appendChild(row);
                        row = document.createElement("tr");
                    }
                }
            }
        }
    });
}

function guardarId(){
    let id = this.id;
    localStorage.setItem('mesa', id);
    window.location.href = './views/realizarPedido';
}

function verifyTime(idMesa, callback) {
    let fecha = formatDate(new Date(Date.now()));
    getReservasId(idMesa, fecha, (horasReserva) => {
        if (horasReserva) {
            let horaHoy = new Date();
            let hora = horaHoy.getHours();
            let min = ("0" + horaHoy.getMinutes()).slice(-2);
            let horaActual = `${hora}:${min}`;
            horasReserva.map(horaR => {
                horaPartida = horaR.split(":");
                horaPartida[0] = parseInt(horaPartida[0]) - 1;
                horaAnterior = `${horaPartida[0]}:${horaPartida[1]}`;
                if (horaActual > horaAnterior && horaActual < horaR) {
                    callback('reservado');
                }
            });
        }
    });
    callback('disponible');
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

function getReservasId(idMesa, date, callback) {
    let data = {
        date
    }
    $.ajax({
        type: 'GET',
        url: `${API_URL}/admin/reserva/${idMesa}`,
        async: true,
        cache: false,
        data: data,
        success: function (data) {
            var datos = new Array();
            data.map(reserva => {
                datos.push(reserva.hora);
            });
            callback(datos);
        }
    });
}

document.addEventListener("DOMContentLoaded", loadData());