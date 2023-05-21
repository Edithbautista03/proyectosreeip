const connection = require('../database/database');

//Método para iniciar sesión en el sistema SREEIP
exports.iniciarSesion = (req, res) => {
    const correo_electronico = req.correo_electronico;
    const contrasena = req.contrasena;
    connection.query('SELECT * usuario WHERE correo_electronico = ? AND constrasena = ?', [{ correo_electronico: correo_electronico, contrasena: contrasena }], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/inicio-sesion');
        }
    })
}

//Método para registrar pacientes en el sistema
exports.registrarPaciente = (req, res)=> {

    const nombre = req.body.nombre;
    const apellido_paterno = req.body.apellido_paterno;
    const apellido_materno = req.body.apellido_materno;
    const edad = req.body.edad;
    const direccion = req.body.direccion;
    const fecha_nacimiento = req.body.fecha_nacimiento;
    const grado_escolar = req.body.grado_escolar;
    const nombre_escuela = req.body.nombre_escuela;
    
    connection.query('INSERT INTO pacientes SET ?', {nombre:nombre, apellido_paterno:apellido_paterno, apellido_materno:apellido_materno, edad:edad, direccion:direccion,  fecha_nacimiento:fecha_nacimiento, grado_escolar:grado_escolar, nombre_escuela:nombre_escuela}, (error, results)=>{
        if(error) {
            console.log(error);
        } else {
            res.redirect('/paciente-registro');
        }
    })
}
