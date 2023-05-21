const express = require('express');
const router = express.Router();
const connection = require('../database/database');

//Ruta inicial del sistema
router.get('/', (req, res) => {
	if (req.session.loggedin) {
		res.redirect('/inicio');
	} else {
		res.render('login.ejs');
	}
	res.end();
});

//Ruta de autenticación de usuarios
router.post('/inicio-sesion', async (req, res) => {
	const correo_electronico = req.body.correo_electronico;
	const contrasena = req.body.contrasena;
	if (correo_electronico && contrasena) {
		connection.query('SELECT * FROM usuario WHERE correo_electronico = ? AND contrasena = ?', [correo_electronico, contrasena], async (error, results, fields) => {
			if (results.length == 0) {
				res.redirect('/');
			} else {
				//Se crea una variable de session y le asignamos true si el usuario inicio sesion en el sistema
                //Declaramos los atributos del usuario para mostrarlos en la capa vista del sistema (barra de navegación)
				req.session.loggedin = true;
				req.session.nombre = results[0].nombre;
				req.session.apellido_paterno = results[0].apellido_paterno;
				req.session.apellido_materno = results[0].apellido_materno;
				req.session.correo_electronico = results[0].correo_electronico;
				res.redirect('/inicio');
			}
			res.end();
		});
	} else {
		res.send('Favor de Ingresar Correo Electronico y Contrasena!');
		res.end();
	}
});

//Ruta de inicio al sistema
//Contiene una condición que permite verificar si el usuario inicio correctamente al sistema
router.get('/inicio', (req, res) => {
	if (req.session.loggedin) {
		res.render('inicio', {
			login: true,
			correo_electronico: req.session.correo_electronico,
			nombre: req.session.nombre,
			apellido_paterno: req.session.apellido_paterno,
			apellido_materno: req.session.apellido_materno
		});
	} else {
		res.redirect('/');
	}
	res.end();
});

//Método para limpiar la caché luego del cierre de sesión
router.use(function (req, res, next) {
	if (!req.correo_electronico)
		res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	next();
});

//Ruta que permite destruir la sesión.
router.get('/cerrar-sesion', function (req, res) {
	req.session.destroy(() => {
		// La función redirect siempre se ejecutará después de que se destruya la sesión
		res.redirect('/')
	})
});



//Método ruta que permite registrar paciente en el sistema
//(está conectada con la capa controller)
router.get('/paciente-registro', (req, res)=> {
	if (req.session.loggedin) {
		res.render('registroPaciente', {
			login: true,
            correo_electronico: req.session.correo_electronico,
			contrasena: req.session.contrasena,
			nombre: req.session.nombre,
			apellido_paterno: req.session.apellido_paterno,
			apellido_materno: req.session.apellido_materno
		});
	} else {
        res.redirect('/');
	}
	res.end();
});

const controller = require('../controller/controller');
const { DEC8_BIN } = require('mysql/lib/protocol/constants/charsets');

router.post('/inicio-sesion', controller.iniciarSesion);

//ruta para el registro de pacientes
router.post('/paciente-registro', controller.registrarPaciente);
module.exports = router;