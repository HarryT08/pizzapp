function setLogin() {
    document.getElementById('rol-info').innerHTML = sessionStorage.getItem('rol');
    document.getElementById('user-info').innerHTML = sessionStorage.getItem('user');
    document.getElementById('nombre-info').innerHTML = sessionStorage.getItem('nombre');
}

function signOut(){
    sessionStorage.clear();
    window.location.href = './index';
}

document.addEventListener("DOMContentLoaded", setLogin());