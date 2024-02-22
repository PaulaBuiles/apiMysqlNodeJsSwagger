import db from "../config/db.js";
import { Router } from "express";
import { validarPermisos } from "../lib/permisosLib.js";

const vehiculoRouter = Router();

/**
 * @swagger
 * /api/vehiculo/Ver:
 *   get:
 *     summary: Obtiene el listado de vehículos.
 *     description: Endpoint para obtener el listado de vehículos con los datos permitidos por la sesión actual.
 *     tags: [Vehiculo]
 *     responses:
 *       200:
 *         description: Acceso permitido. Devuelve el listado de vehículos.
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
 *                 vehiculo:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_vehiculo:
 *                         type: integer
 *                         description: ID del vehículo.
 *                       placa:
 *                         type: string
 *                         description: Placa del vehículo.
 *                       referencia:
 *                         type: string
 *                         description: Referencia del vehículo.
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
vehiculoRouter.get('/Ver', async (req, res) => {
    const api_key = 'f3f1fa1e4348bfbebdeee8c80a04c3b9';
    const controlador = 'Vehiculo';
    const accion = 'Ver';
  
    const tienePermisos = await validarPermisos(api_key, controlador, accion);
  
    if (tienePermisos) {
      try {
        const connection = await db.promise();
  
        // Realizar consulta para obtener listado de vehículos
        const [vehiculos] = await connection.execute(
          'SELECT id_vehiculo, placa, referencia FROM vehiculo LIMIT 10'
        );
  
        const listaVehiculos = vehiculos.map(({ id_vehiculo, placa, referencia }) => ({
          id_vehiculo,
          placa,
          referencia,
        }));
  
        const respuesta = {
          mensaje: 'Acceso permitido',
          id_empresa: tienePermisos.id_empresa,
          id_empresa_persona: tienePermisos.id_empresa_persona,
          vehiculo: listaVehiculos,
        };
  
        // Convertir objeto a JSON con formato legible
        const jsonString = JSON.stringify(respuesta, null, 2);
        
        res.setHeader('Content-Type', 'application/json');
        res.send(jsonString);
      } catch (error) {
        console.error('Error al obtener listado de vehículos:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
      }
    } else {
      res.status(403).json({ mensaje: 'Acceso denegado' });
    }
  });

/**
 * @swagger
 * /api/vehiculo/Vehiculo_mantenimiento_detalle/Ver:
 *   get:
 *     summary: Obtiene el detalle de mantenimiento de vehículos.
 *     description: Endpoint para obtener el detalle de mantenimiento de vehículos con los datos permitidos por la sesión actual.
 *     tags: [Vehiculo]
 *     responses:
 *       200:
 *         description: Acceso permitido. Devuelve el detalle de mantenimiento de vehículos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de éxito.
 *                 vehiculo:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_vehiculo_mantenimiento_detalle:
 *                         type: integer
 *                         description: ID del detalle de mantenimiento de vehículo.
 *                       observacion:
 *                         type: string
 *                         description: Observación del mantenimiento.
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

vehiculoRouter.get('/Vehiculo_mantenimiento_detalle/Ver', async (req, res) => {
    //const tienePermisos = req.session.tienePermisos;
    const api_key = 'f3f1fa1e4348bfbebdeee8c80a04c3b9';
    const controlador = 'Vehiculo_mantenimiento_detalle';
    const accion = 'Ver';
  
    const tienePermisos = await validarPermisos(api_key, controlador, accion);
  
    if (tienePermisos) {
      try {
        const connection = await db.promise();
  
        // Realizar consulta para obtener listado de vehículos de mantenimiento
        const [vehiculoMantenimientoDetalle] = await connection.execute(
          'SELECT id_vehiculo_mantenimiento_detalle, observacion FROM vehiculo_mantenimiento_detalle'
        );
  
        const listaVehiculosDetalle = vehiculoMantenimientoDetalle.map(({ id_vehiculo_mantenimiento_detalle, observacion }) => ({
          id_vehiculo_mantenimiento_detalle,
          observacion,
        }));
  
        const respuesta = {
          mensaje: 'Acceso permitido',
          vehiculo: listaVehiculosDetalle,
        };
  
        // Usa los datos de permisosInfo...
        // Por ejemplo, puedes hacer algo con la respuesta, enviarla al cliente, etc.
        res.json(respuesta);
      } catch (error) {
        console.error('Error al obtener listado de vehículos de mantenimiento:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
      }
    } else {
      res.status(403).json({ mensaje: 'Acceso denegado' });
    }
  });
  
  export default vehiculoRouter;
