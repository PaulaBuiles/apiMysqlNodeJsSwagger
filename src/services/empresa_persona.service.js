import db from "../config/db.js";
import { Router } from "express";
import { validarPermisos } from "../lib/permisosLib.js";

const empresaPersonaRouter = Router();

/**
 * @swagger
 * /api/Empresa_persona/Ver: 
 *   get:
 *     summary: Obtiene el listado de personas de empresa.
 *     description: |
 *       Este endpoint devuelve el listado de personas de empresa con los datos permitidos por la sesión actual.
 *     tags: [Empresa Persona]
 *     responses:
 *       200:
 *         description: Acceso permitido. Devuelve el listado de personas de empresa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de éxito.
 *                 id_empresa:
 *                   type: integer
 *                   description: ID de la empresa.
 *                 id_empresa_persona:
 *                   type: integer
 *                   description: ID de la persona asociada a la empresa.
 *                 personas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_empresa_persona:
 *                         type: integer
 *                         description: ID de la persona de empresa.
 *                       cargo:
 *                         type: string
 *                         description: Cargo de la persona.
 *                       nombre_completo:
 *                         type: string
 *                         description: Nombre completo de la persona.
 *                       identificacion:
 *                         type: string
 *                         description: Identificación de la persona.
 *                       edad:
 *                         type: integer
 *                         description: Edad de la persona.
 *                       fecha_nacimiento:
 *                         type: string
 *                         description: Fecha de nacimiento de la persona.
 *                       estado:
 *                         type: string
 *                         description: Estado de la persona.
 *       403:
 *         description: Acceso denegado. La sesión no tiene los permisos necesarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de acceso denegado.
 *       500:
 *         description: Error interno del servidor. Ocurrió un error al procesar la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de error interno del servidor.
 */

//Metodo de traer empresa_persona con variables de sesion
empresaPersonaRouter.get('/Empresa_persona/Ver', async (req, res) => {
    const api_key = 'f3f1fa1e4348bfbebdeee8c80a04c3b9'
    const controlador = 'Empresa_persona';
    const accion = 'Ver';
  
    const tienePermisos = await validarPermisos(api_key, controlador, accion);
  
    if (tienePermisos) {
      //req.session.tienePermisos = tienePermisos;
      try {
        const connection = await db.promise();
  
        // Realizar consulta para obtener listado de personas de empresa
        const [empresa_persona] = await connection.execute(
            `SELECT
              EP.id_empresa_persona,
              IFNULL(CE.descripcion, '') AS cargo,
              P.nombre_completo,
              P.identificacion,
              TIMESTAMPDIFF(YEAR, DATE_ADD(FROM_UNIXTIME(0), INTERVAL P.fecha_nacimiento SECOND), CURDATE()) AS edad,
              fn_fecha(P.fecha_nacimiento) AS fecha_nacimiento,
              EP.estado
            FROM
              empresa_persona EP
              JOIN persona P ON P.id_persona = EP.id_persona
              LEFT JOIN cargo_empresa CE ON CE.id_cargo_empresa = EP.id_cargo_empresa
              LEFT JOIN empresa_persona_dependencia EPD ON EPD.id_empresa_persona = EP.id_empresa_persona
              LEFT JOIN empresa ED ON ED.id_empresa = EPD.id_empresa
            GROUP BY
              EP.id_empresa_persona
            LIMIT 10`
          );
  
        const listaPersonas = empresa_persona.map(({ id_empresa_persona, cargo, nombre_completo, identificacion, edad, fecha_nacimiento, estado }) => ({
            id_empresa_persona,
            cargo,
            nombre_completo,
            identificacion,
            edad,
            fecha_nacimiento,
            estado,
        }));
  
        const respuesta = {
          mensaje: 'Acceso permitido',
          id_empresa: tienePermisos.id_empresa,
          id_empresa_persona: tienePermisos.id_empresa_persona,
          personas: listaPersonas,
        };
  
        // Convertir objeto a JSON con formato legible
        const jsonString = JSON.stringify(respuesta, null, 2);
        
        res.setHeader('Content-Type', 'application/json');
        res.send(jsonString);
      } catch (error) {
        console.error('Error al obtener listado de personas de empresa:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
      }
    } else {
      res.status(403).json({ mensaje: 'Acceso denegado' });
    }
});

export default empresaPersonaRouter;