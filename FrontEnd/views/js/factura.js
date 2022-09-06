const API_URL = "https://orquiweb.herokuapp.com";

function imprimir() {
    //Obtenemos el div que vamos a imprimir
    var content = document.getElementById('print');
    //Creamos una variable que nos abra una nueva pestaña
    w = window.open();
    //Le añadimos las etiquetas de html y los estilos (Para que tome tal cual tenemos la página)
    w.document.write("<html><head><title></title>");
    //Escribimos los links del css
    w.document.write("<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css\" type=\"text/css\"/>");
    w.document.write("<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css\" type=\"text/css\"/>");
    //Cerramos la etiqueta head y abrimos el body
    w.document.write("</head><body>");
    //Imprimimos el div que obtuvimos de html
    w.document.write(content.innerHTML);
    //Cerramos el html
    w.document.write("</body></html>");
    //Realizamos una espera, para que se carguen los estilos y la página, y luego abrimos la pestaña de impresión.
    setTimeout(function () {
        w.document.close();
        w.print();
        w.close();
    }, 200);
}

function loadData() {
    $.ajax({
        type: 'POST',
        url: `${API_URL}/admin/mesa/${localStorage.getItem('idMesa')}`,
        async: true,
        cache: false,
        success: function (data) {
            $.ajax({
                type: 'GET',
                url: `${API_URL}/admin/facturar/${localStorage.getItem('idMesa')}`,
                async: true,
                cache: false,
                success: function (data) {
                    let tbody = document.getElementById('carrito');
                    data.forEach(pedido => {
                        let row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${pedido.nombre}</td>
                            <td>${pedido.costoUnidad}</td>
                            <td>${pedido.cantidad}</td>
                            <td>${pedido.totalProducto}</td>                    
                        `;
                        tbody.appendChild(row);
                    });
                    document.getElementById('total-pagar').value = data[0].totalComanda;
                    localStorage.clear();
                }
            });
        }
    })    
}

document.addEventListener("DOMContentLoaded", loadData());