const API_URL = "https://orquiweb.herokuapp.com";
document.addEventListener("DOMContentLoaded", loadData());

function loadData() {
    $.ajax({
        type: 'GET',
        url: `${API_URL}/admin/mesa`,
        async: true,
        cache: false,
        success: function (data) {
            let tbody = document.getElementById('mesas');
            data.forEach(mesa => {
                let tr = document.createElement('tr');
                tr.innerHTML = `
                <td>${mesa.idMesa}</td>
                <td>
                ${estado(mesa.estado)}                    
                </td>
                <td>
                    <a onclick="eliminar(${mesa.idMesa})" style="cursor:pointer;"><em class="icon ni ni-trash" ></em><span>Eliminar</span></a>
                </td>
            `;
                tbody.appendChild(tr);
            });
        }
    });
}

function estado(mesaEstado) {
    console.log(mesaEstado);
    if (mesaEstado == 'disponible') {
        return `<span class="badge badge-pill badge-success">Disponible</span>`;
    } else {
        if (mesaEstado == 'ocupada') {
            return `<span class="badge badge-pill badge-danger">Ocupada</span>`;
        } else {
            return `<span class="badge badge-pill badge-warning">Reservada</span>`;
        }
    }
}

function eliminar(id) {
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
                url: `${API_URL}/admin/mesa/${id}`,
                async: true,
                cache: false,
            }).done(function () {
                Swal.fire({
                    title: 'Borrado!',
                    text: 'La mesa ha sido eliminada.',
                    icon: 'success'
                }).then((willDelete) => {
                    window.location.href = "./views/mesas";
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

function enviarForm() {
    let idMesa = document.getElementById('idMesa').value;
    let estado = document.getElementById('estado').value;
    if (idMesa === '') {
        let div = document.getElementById('alert');
        div.innerHTML = `
            <em class="icon ni ni-cross-circle"></em> <strong>Campos vacios, revise nuevamente</strong>.
        `;
        div.className = 'alert alert-danger alert-icon';
    } else {
        var data = {
            idMesa,
            estado
        }
        fetch(`${API_URL}/admin/mesa`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            if (response.ok) {
                Swal.fire({
                    title: 'Registrado!',
                    text: 'La mesa ha sido registrada exitosamente.',
                    icon: 'success'
                }).then((willDelete) => {
                    window.location.href = "./views/mesas";
                });
            } else {
                let div = document.getElementById('alert');
                div.innerHTML = `
                <em class="icon ni ni-cross-circle"></em> <strong>Id de la mesa ya existe</strong>.
                 `;
                div.className = 'alert alert-danger alert-icon';
            }
        })
    }
}