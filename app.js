//1. Invocacion a Express
const express = require('express');
const app = express();

//2. Invocacion de urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//3. Invocacion a dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './env/.env' });

//4. Invocacion del directorio public para el uso de componentes estaticos
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//4.5. Comando para Mostrar en consola la Ruta Local donde se encuentra el Proyecto
console.log('Ruta: ' + __dirname);

//5. Invocacion al Motor de Plantilla ejs
app.set('view engine', 'ejs');

//6. Invocacion a bcryptjs
const bcryptjs = require('bcryptjs');

//7. Invocacion de Variable de Session
const session =require('express-session');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//8. Invocacion del Modulo de Conexion con la Base de Datos
const connection = require('./database/database');

//9. Invocacion de la Capa Rutas (Routes)
const router = require('./routes/routes');
app.use('/', router);

app.listen(5000, (req, res) => {
	console.log('Proyecto ejecutandose correctamente en http://localhost:5000/')
})