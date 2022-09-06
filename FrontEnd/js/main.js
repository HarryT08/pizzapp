/* CONSTANTES ELEMENTO */
const fondoPink = document.querySelector('div.fond-pink');
const Caja1 = document.querySelector('div.caja1');
const SelectF = document.querySelector('div.select-i');
const labelText = document.getElementsByClassName('texto');
const Formulario = document.getElementById('Form');
const Email = document.getElementById('email');
const ErrorT = document.querySelector('div.error');
const Registrado = document.querySelector('div.registrado');
const Boton = document.querySelector('input.boton');
const Usuario = "administracion";
const Pass = "cristianbohemia2020";

/* VALIDACION FORMULARIO */

Formulario.addEventListener('submit', function(e) {
    let Nombre = document.querySelector('input#nombre').value;
	let Contra = document.querySelector('input#contra').value;
	if(Nombre==Usuario && Contra==Pass){
		document.location.assing('validar.html');
	}
	else{
		alert(`Usuario y/o Contraseña incorrectos`);
	}
})