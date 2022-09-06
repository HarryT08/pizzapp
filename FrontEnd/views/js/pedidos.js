const API_URL = "https://orquiweb.herokuapp.com";
document.addEventListener("DOMContentLoaded", loadData());
const music = new Audio('./assets/voice/ding.mp3');
let pedido = 0;
let pedidoAnt = 0;

function loadData() {
  $.ajax({
    type: "GET",
    url: `${API_URL}/pase/pedidos`,
    async: true,
    cache: false,
    success: function (data) {
      let tbody = document.getElementById("pedidos");
      tbody.innerHTML = '';
      pedidoAnt = pedido;
      pedido = data.length;
      data.forEach((pedido) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
                <td>${pedido.idComanda}</td>
                <td>Mesa #${pedido.idMesa}</td>
                <td>${pedido.idUsuario}</td>
                <td>
                    <a onclick="modalVerification(${pedido.idComanda})" data-toggle="modal" data-target="#modalDefault"><em class="icon ni ni-edit"></em><span>Verificar</span></a>
                </td>
            `;
        tbody.appendChild(tr);
      });
      if (pedidoAnt != pedido) {
        music.play();
      }
      setTimeout(loadData, 30000);
    },
  })
}

function denegarPedido(idComanda) {
  Swal.fire({
    title: "Estás seguro?",
    text: "Al denegar no podrás revertirlo!",
    icon: "danger",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar!",
  }).then(async () => {
    const checks = document.querySelectorAll(".valores");
    const comentario = document.getElementById("comentario");
    checks.forEach(async (idProducto) => {
      if (idProducto.checked) {
        await fetch(`${API_URL}/pase/productos/denegar`, {
          method: "PATCH",
          body: JSON.stringify({
            idComanda: idComanda,
            idProducto: idProducto.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    });
    await fetch(`${API_URL}/pase/pedidos/mensaje/${idComanda}`, {
      method: "PATCH",
      body: JSON.stringify({ mensaje: comentario.value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.href = "./views/home_pase";
  })
}

function modalVerification(idComanda) {
  $.ajax({
    type: "GET",
    url: `${API_URL}/pase/pedidos/${idComanda}`,
    async: true,
    cache: false,
    success: function (productos) {
      let modalBody = document.getElementById("carrito");
      document.getElementById(
        "mesa"
      ).innerHTML = `<h3> Mesa # ${productos[0].idMesa}</h3>`;
      modalBody.innerHTML = "";
      productos.forEach((producto) => {
        let div = document.createElement("div");
        div.innerHTML = `<input type = "checkbox" value = "${producto.idProducto}" class = "valores">
                     <label class="form-label" > 
                        <span class = "badge"> Cantidad : ${producto.cantidad} </span>
                        <span class = "badge">${producto.nombre} </span>
                    </label>
                    `;
        div.classList.add("form-control");
        div.style.marginBottom = "2%";
        modalBody.appendChild(div);
      });
      const commentSection = document.createElement("div");
      commentSection.classList.add("container-fluid");
      commentSection.innerHTML = `
                <label for="comentario" class="form-label">Comentarios</label>
                <textarea class="form-control" id="comentario" rows="3"></textarea>
            `;
      commentSection.style.marginBottom = "2%";
      modalBody.appendChild(commentSection);
    },
  });
  
  document.getElementById("aceptar").onclick = () => {
    aceptarPedido(idComanda);
  };

  document.getElementById("denegar").onclick = () => {
    denegarPedido(idComanda);
  };
}

function aceptarPedido(idComanda) {
  fetch(`${API_URL}/pase/pedidos/${idComanda}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async () => {
    await fetch(`${API_URL}/pase/pedidos/mesas/${idComanda}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
  }).then(() => window.location.href = "./views/home_pase");
}
