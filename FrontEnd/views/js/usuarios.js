const API_URL = "https://orquiweb.herokuapp.com";
document.addEventListener("DOMContentLoaded", loadData());

function loadData() {
    $.ajax({
        type: 'GET',
        url: `${API_URL}/admin/user`,
        async: true,
        cache: false,
        success: function (data) {
            let tbody = document.getElementById('usuarios');
            data.forEach(user => {
                let tr = document.createElement('tr');
                tr.innerHTML = `
                <td>${user.idUsuario}</td>
                <td>${user.username}</td>
                <td>${user.nombre}</td>
                <td>${user.apellido}</td>
                <td>${user.rol}</td>
                <td class="nk-tb-col nk-tb-col-tools">
                    <ul class="nk-tb-actions gx-1">
                    <li>
                        <div class="drodown">
                            <a href="#" class="dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em class="icon ni ni-more-h"></em></a>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <ul class="link-list-opt no-bdr">
                                        <li><a onclick="modalUpdate(${user.idUsuario})" data-toggle="modal" data-target="#modalDefault"><em class="icon ni ni-edit"></em><span>Editar</span></a></li>
                                        <li><a onclick="eliminar(${user.idUsuario})" style="cursor:pointer;" ><em class="icon ni ni-trash"></em><span>Eliminar</span></a></li>
                                    </ul>
                                </div>
                        </div>
                    </li>
                    </ul>
                </td>
            `;
                tbody.appendChild(tr);
            });
        }
    });
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
                url: `${API_URL}/admin/user/${id}`,
                async: true,
                cache: false,
            }).done(function () {
                Swal.fire({
                    title: 'Borrado!',
                    text: 'El usuario ha sido eliminado.',
                    icon: 'success'
                }).then(() => {
                    window.location.href = "./views/usuarios";
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

function modalCrear() {
    document.getElementById('modal-title').innerHTML = "Crear usuario";
    document.getElementById('idUsuario').value = "";
    document.getElementById('username').value = "";
    document.getElementById('name').value = "";
    document.getElementById('apellido').value = "";
    document.getElementById('password').value = "";
    document.getElementById('username').disabled = false;
    let btn = document.getElementById('btn-form');
    btn.innerHTML = "Crear";
    btn.onclick = enviarFormCrear;
    let div = document.getElementById('alert');
    div.innerHTML = "";
    div.className = '';
}

function enviarFormCrear() {
    let username = document.getElementById('username').value;
    let nombre = document.getElementById('name').value;
    let apellido = document.getElementById('apellido').value;
    let password = document.getElementById('password').value;
    let rol = document.getElementById('rol').value;
    if (username === '' || nombre === '' || apellido === '' || password === '') {
        let div = document.getElementById('alert');
        div.innerHTML = `
            <em class="icon ni ni-cross-circle"></em> <strong>Campos vacios, revise nuevamente</strong>.
        `;
        div.className = 'alert alert-danger alert-icon';
    } else {
        var data = {
            username,
            nombre,
            apellido,
            password,
            rol
        }
        fetch(`${API_URL}/admin/user`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            if (response.ok) {
                Swal.fire({
                    title: 'Registrado!',
                    text: 'El usuario ha sido registrado exitosamente.',
                    icon: 'success'
                }).then((willDelete) => {
                    window.location.href = "./views/usuarios";
                });
            } else {
                response.json().then(function (result) {
                    let div = document.getElementById('alert');
                    div.innerHTML = `
                        <em class="icon ni ni-cross-circle"></em> <strong>${result.msg}</strong>.
                    `;
                    div.className = 'alert alert-danger alert-icon';
                });
            }
        })
    }
}

function modalUpdate(idUsuario) {
    document.getElementById('modal-title').innerHTML = "Actualizar usuario";
    let btn = document.getElementById('btn-form');
    btn.innerHTML = "Actualizar";
    btn.onclick = enviarFormUpdate;
    let div = document.getElementById('alert');
    div.innerHTML = "";
    div.className = '';
    $.ajax({
        type: 'GET',
        url: `${API_URL}/admin/user/${idUsuario}`,
        async: true,
        cache: false,
        success: function (data) {
            document.getElementById('idUsuario').value = data[0].idUsuario;
            document.getElementById('username').value = data[0].username;
            document.getElementById('username').disabled = true;
            document.getElementById('name').value = data[0].nombre;
            document.getElementById('apellido').value = data[0].apellido;
        }
    });
}

function enviarFormUpdate() {
    let idUsuario = document.getElementById('idUsuario').value;
    let username = document.getElementById('username').value;
    let nombre = document.getElementById('name').value;
    let apellido = document.getElementById('apellido').value;
    let password = document.getElementById('password').value;
    let rol = document.getElementById('rol').value;

    if (username === '' || nombre === '' || apellido === '') {
        let div = document.getElementById('alert');
        div.innerHTML = `
            <em class="icon ni ni-cross-circle"></em> <strong>Campos vacios, revise nuevamente</strong>.
        `;
        div.className = 'alert alert-danger alert-icon';
    } else {
        var data;
        if (password === '') {
            data = {
                username,
                nombre,
                apellido,
                rol
            }
        } else {
            data = {
                username,
                nombre,
                apellido,
                password,
                rol
            }
        }
        fetch(`${API_URL}/admin/user/${idUsuario}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            Swal.fire({
                title: 'Actualizado!',
                text: 'El usuario ha sido actualizado exitosamente.',
                icon: 'success'
            }).then((willDelete) => {
                window.location.href = "./views/usuarios";
            });
        })
    }
}