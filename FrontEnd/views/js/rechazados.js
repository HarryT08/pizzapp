const API_URL = "https://orquiweb.herokuapp.com";

function loadData() {
    $.ajax({
        type: 'GET',
        url: `${API_URL}/mesero/rechazados/${sessionStorage.getItem('userId')}`,
        async: true,
        cache: false,
        success: function (data) {
            let tbody = document.getElementById('view');
            data.forEach(pedido => {
                let tr = document.createElement('tr');
                tr.innerHTML = `
                <td>${pedido.idMesa}</td>
                <td>${pedido.mensaje}</td>
                <td>                
                    <a onclick='loadModal(${pedido.idComanda})' class="btn btn-dim btn-info" data-toggle="modal" data-target="#modalDefault">                    
                    Ver productos
                    <em class="icon ni ni-info"></em>
                    </a>
                </td>
            `;
                tbody.appendChild(tr);
            });
        }
    });
}

function loadModal(idComanda) {
    $.ajax({
        type: 'GET',
        url: `${API_URL}/mesero/pedidosR/${idComanda}`,
        async: true,
        cache: false,
        success: function (data) {
            let tbody = document.getElementById('carrito');
            tbody.innerHTML = '';
            data.forEach(producto => {
                console.log(producto);
                let div = document.createElement("div");
                div.innerHTML = `
                     <label class="form-label" > 
                        <span class = "badge">${producto.nombre} </span>
                        <span class = "badge"> Cantidad : ${producto.cantidad} </span>
                        <span class = "badge"> Cantidad : ${producto.costoUnidad} </span>
                    </label>
                    `;
                div.classList.add("form-control");
                div.style.marginBottom = "2%";
                tbody.appendChild(div);
            });
        }
    });
}

document.addEventListener("DOMContentLoaded", loadData());