<!DOCTYPE html>
	<head>
		<meta charset="UTF-8";
		<title>Validar</title>		
	</head>
	<body>
		<?php
			session_start();
			$usuario = $_POST('nombre');
			$contra = $_POST('contra');
			$user = 'admin';
			$pass = 'cristianbohemia2020';
			if($usuario == $user && $contra == $pass){
				$_SESSION['u_usuario'] = $usuario;
				echo "Sesión iniciada";
				//header("Location: ../Dashboard/index.html");
			}else{
				echo "Usuario y/o contraseña incorrectos";
			}
		?>
	</body>
</html>