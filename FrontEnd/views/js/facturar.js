const API_URL = "https://orquiweb.herokuapp.com";

function loadData() {
    $.ajax({
        type: 'GET',
        url: `${API_URL}/admin/mesa/ocupado`,
        async: true,
        cache: false,
        success: function (data) {
            if (data.length === 0) {
                const table = document.getElementById("view");
                let row = document.createElement("tr");
                const mesa = document.createElement("td");
                mesa.innerHTML = "No hay mesas disponibles para facturar";
                row.appendChild(mesa);
                table.appendChild(row);
            } else {
                const table = document.getElementById("view");
                let row = document.createElement("tr");
                for (let i = 0; i < data.length; i++) {
                    let id_mesa = `${data[i].idMesa}`;
                    const mesa = document.createElement("td");
                    const btnMesa = document.createElement("button");
                    btnMesa.innerHTML = id_mesa;
                    btnMesa.id = id_mesa;
                    btnMesa.onclick = realizarFactura;
                    btnMesa.classList.add('ocupado');
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

function realizarFactura() {
    localStorage.setItem('idMesa', this.id);
    window.location.href = './views/factura';
}

document.addEventListener("DOMContentLoaded", loadData());