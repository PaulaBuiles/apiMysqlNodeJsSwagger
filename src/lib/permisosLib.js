// permisosLib.js
import db from '../config/db.js'; // Ajusta la ruta según tu estructura


export async function validarPermisos(api_key, controlador, accion) {
  try {
    // Utiliza createConnection con la cadena de conexión URI
    const connection = await db.promise();
    console.log('Valores antes de la consulta:', api_key, controlador, accion);
    const [results] = await connection.execute(
      `SELECT UEP.api_key , EP.id_empresa_persona, E.id_empresa
       FROM usuario_empresa_persona UEP
        JOIN empresa_persona EP ON EP.id_empresa_persona = UEP.id_empresa_persona
        JOIN persona P ON P.id_persona = EP.id_persona
        JOIN empresa E ON E.id_empresa = EP.id_empresa
        JOIN rol_empresa RE ON RE.id_empresa = E.id_empresa
        JOIN rol_empresa_usuario REU ON REU.id_usuario = UEP.id_usuario AND RE.id_rol_empresa = REU.id_rol_empresa
        JOIN rol R ON R.id_rol = RE.id_rol
        JOIN permiso_rol PR ON PR.id_rol = R.id_rol
        JOIN permiso PER ON PER.id_permiso = PR.id_permiso
        JOIN objeto_sar C ON C.id_objeto_sar = PER.id_objeto_controlador 
        JOIN objeto_sar A ON A.id_objeto_sar = PER.id_objeto_metodo
       WHERE UEP.api_key = ? 
       AND C.nombre = ? 
       AND A.nombre = ?`,
      [api_key, controlador, accion]
    );

    const tienePermisos = results.length > 0;

    if (!tienePermisos) {
      console.log(`Acceso denegado para apiKey: ${api_key}, controlador: ${controlador}, accion: ${accion}`);
    }else{
      console.log(`Acceso permitido para apiKey: ${api_key}, controlador: ${controlador}, accion: ${accion}`);
      const { id_empresa, id_empresa_persona } = results[0];
      return { id_empresa, id_empresa_persona };
      // const [resultado] = results
    }

    return tienePermisos;
  } catch (error) {
    console.error('Error al validar permisos:', error);
    return false; // En caso de error, considera que no hay permisos
  }
}
