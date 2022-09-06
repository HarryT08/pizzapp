const API_URL = "https://orquiweb.herokuapp.com";

function loadData() {
  let date = formatDate(new Date(Date.now()));
  let time = new Date();
  let timeH = `${time.getHours()}:${("0" + time.getMinutes()).slice(-2)}`;
  let data = {
    date,
    timeH
  }
  $.ajax({
    type: 'GET',
    url: `${API_URL}/admin/reserva`,
    async: true,
    cache: false,
    data: data,
    success: function (data) {
      if (data.length === 0) {
        const table = document.getElementById("reservas");
        let row = document.createElement("tr");
        const mesa = document.createElement("td");
        mesa.colSpan = 6
        mesa.innerHTML = "No hay reservas realizadas";
        row.appendChild(mesa);
        table.appendChild(row);
      }
      else {
        const table = document.getElementById("reservas");
        data.forEach(reserva => {
          let tr = document.createElement('tr');
          tr.innerHTML = `
                <td>${reserva.idMesa}</td>
                <td>${reserva.nombreCliente}</td>
                <td>${reserva.fecha}</td>
                <td>${reserva.hora}</td>
                <td><span class="badge badge-pill badge-warning">Reserva</span></td>
                <td>
                  <a onclick="eliminarReserva(${reserva.idReserva})" style="cursor:pointer;" ><em class="icon ni ni-trash"></em><span>Eliminar</span></a>
                </td>
            `;
          table.appendChild(tr);
        })

      }
    }
  });
}

function eliminarReserva(id) {
  Swal.fire({
    title: 'Estás seguro?',
    text: "Al eliminar no podrás revertirlo!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar!'
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        type: 'DELETE',
        url: `${API_URL}/admin/reserva/${id}`,
        async: true,
        cache: false,
      }).done(function () {
        Swal.fire({
          title: 'Borrado!',
          text: 'La reserva ha sido eliminada.',
          icon: 'success'
        }).then(() => {
          window.location.href = "./views/eliminarReserva";
        });
      }).fail(function () {
        Swal.fire({
          title: 'No se ha podido eliminar',
          text: 'Ha ocurrido un error',
          icon: 'error'
        });
      });
    }
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

document.addEventListener("DOMContentLoaded", loadData());