const API_URL = "https://orquiweb.herokuapp.com";
document.addEventListener("DOMContentLoaded", loadData());

function loadData() {
    $.ajax({
        type: 'GET',
        url: `${API_URL}/admin/producto`,
        async: true,
        cache: false,
        success: function (data) {
            let tbody = document.getElementById('productos');
            data.forEach(producto => {
                let tr = document.createElement('tr');
                tr.innerHTML = `
                <td>${producto.idProducto}</td>
                <td>${producto.nombre}</td>
                <td>${producto.costoUnidad}</td>
                <td class="nk-tb-col nk-tb-col-tools">
                    <ul class="nk-tb-actions gx-1">
                    <li>
                        <div class="drodown">
                            <a href="#" class="dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown"><em class="icon ni ni-more-h"></em></a>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <ul class="link-list-opt no-bdr">
                                        <li><a onclick="modalUpdate(${producto.idProducto})" data-toggle="modal" data-target="#modalDefault"><em class="icon ni ni-edit"></em><span>Editar</span></a></li>
                                        <li><a onclick="eliminar(${producto.idProducto})" style="cursor:pointer;" ><em class="icon ni ni-trash"></em><span>Eliminar</span></a></li>
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


function modalUpdate(idProducto) {
    document.getElementById('modal-title').innerHTML = "Actualizar producto";
    let btn = document.getElementById('btn-form');
    btn.innerHTML = "Actualizar";
    btn.onclick = enviarFormUpdate;
    let div = document.getElementById('alert');
    div.innerHTML = "";
    div.className = '';
    $.ajax({
        type: 'GET',
        url: `${API_URL}/admin/producto/${idProducto}`,
        async: true,
        cache: false,
        success: function (data) {
            console.log("actualizar " , data);
            document.getElementById('idProducto').value = data[0].idProducto;
            document.getElementById('nombre').value = data[0].nombre;
            document.getElementById('precio').value = data[0].costoUnidad;
        }
    });
}

function enviarFormUpdate() {
    let idProducto = document.getElementById('idProducto').value;
    let nombre = document.getElementById('nombre').value; 
    let costoUnidad = document.getElementById('precio').value;

    if (costoUnidad === '' || nombre === '') {
        let div = document.getElementById('alert');
        div.innerHTML = `
            <em class="icon ni ni-cross-circle"></em> <strong>Campos vacios, revise nuevamente</strong>.
        `;
        div.className = 'alert alert-danger alert-icon';
    } else {
        var data = {
            nombre, 
            costoUnidad
        }
        fetch(`${API_URL}/admin/producto/${idProducto}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            Swal.fire({
                title: 'Actualizado!',
                text: 'El producto ha sido actualizado exitosamente.',
                icon: 'success'
            }).then((willDelete) => {
                window.location.href = "./views/productos";
            });
        })
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
                url: `${API_URL}/admin/producto/${id}`,
                async: true,
                cache: false,
            }).done(function () {
                Swal.fire({
                    title: 'Borrado!',
                    text: 'El producto ha sido eliminado.',
                    icon: 'success'
                }).then(() => {
                    window.location.href = "./views/productos";
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
    document.getElementById('modal-title').innerHTML = "Agregar Producto";
    document.getElementById('nombre').value = "";
    document.getElementById('precio').value = "";
    let btn = document.getElementById('btn-form');
    btn.innerHTML = "Agregar";
    btn.onclick = enviarFormCrear;
    let div = document.getElementById('alert');
    div.innerHTML = "";
    div.className = '';
}

function enviarFormCrear() {
    console.log('entro');
    let nombre = document.getElementById('nombre').value;
    let precio = document.getElementById('precio').value;

    if (nombre === '' || precio === '') {
        let div = document.getElementById('alert');
        div.innerHTML = `
            <em class="icon ni ni-cross-circle"></em> <strong>Campos vacios, revise nuevamente</strong>.
        `;
        div.className = 'alert alert-danger alert-icon';
    } else {
        var data = {
            nombre: nombre,
            costoUnidad: precio
        }
        fetch(`${API_URL}/admin/producto`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            if (response.ok) {
                Swal.fire({
                    title: 'Producto Registrado!',
                    text: 'El producto ha sido registrado exitosamente.',
                    icon: 'success'
                }).then((willDelete) => {
                    window.location.href = "./views/productos";
                });
            } else {
                let div = document.getElementById('alert');
                div.innerHTML = `
                <em class="icon ni ni-cross-circle"></em> <strong>El producto ya existe</strong>.
                 `;
                div.className = 'alert alert-danger alert-icon';
            }
        })
    }
}