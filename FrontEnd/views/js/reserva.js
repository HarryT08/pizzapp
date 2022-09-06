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
        mesa.innerHTML = "No hay mesas disponibles para hacer reservas";
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
          btnMesa.classList.add('disponible');
          btnMesa.onclick = cargarModal;
          btnMesa.setAttribute('data-toggle', 'modal');
          btnMesa.setAttribute('data-target', '#modalDefault');
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

function cargarModal() {
  let id = parseInt(this.id);
  document.getElementById('idMesa').value = id;
  let date = new Date(Date.now());
  document.getElementById('fecha').value = formatDate(date);
  getReservasId(id, formatDate(date));
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

function cambiarHoras() {
  let fecha = document.getElementById('fecha').value;
  let id = document.getElementById('idMesa').value;
  getReservasId(id, fecha);
}

function getReservasId(idMesa, date) {
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
      data.forEach(reserva => {
        datos.push(reserva.hora);
      });
      loadSelectHour(datos);
    }
  });
}

function loadSelectHour(selected) {
  limpiarSelect();
  let select = document.getElementById('hora');
  for (var i = 17; i < 24; i++) {
    let valor = i + ':00';
    if (!selected.includes(valor)) {
      let option = document.createElement('option');
      option.value = valor;
      option.text = valor + ' PM';
      select.appendChild(option);
    }
  }
}

function limpiarSelect() {
  let select = document.getElementById('hora');
  console.log(select.options.length);
  for (var i = select.options.length; i >= 0; i--) {
    select.remove(i);
  }
}

function realizarReserva() {
  let idMesa = document.getElementById('idMesa').value;
  let fecha = document.getElementById('fecha').value;
  let hora = document.getElementById('hora').value;
  let nombre = document.getElementById('nombre').value;
  let apellido = document.getElementById('apellido').value;
  let notas = document.getElementById('notas').value;
  if (fecha === '' || hora === '' || nombre === '' || apellido === '') {
    let div = document.getElementById('alert');
    div.innerHTML = `
            <em class="icon ni ni-cross-circle"></em> <strong>Campos vacios, revise nuevamente</strong>.
        `;
    div.className = 'alert alert-danger alert-icon';
  } else {
    var data = {
      idMesa,
      fecha,
      hora,
      nombreCliente: nombre,
      apellidoCliente: apellido,
      notas
    }
    fetch(`${API_URL}/admin/reserva`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      Swal.fire({
        title: 'Registrado!',
        text: 'La reserva ha sido registrada exitosamente.',
        icon: 'success'
      }).then((willDelete) => {
        window.location.href = "./views/reserva";
      });
    })
  }
}

document.addEventListener("DOMContentLoaded", loadData());