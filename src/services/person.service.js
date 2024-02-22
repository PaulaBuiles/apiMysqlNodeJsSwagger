import db from "../config/db.js";
//funciones para SIAG tabla persona

/**
 * @swagger
 * /api/persona:
 *   get:
 *     summary: Obtiene la lista de personas con información básica.
 *     description: Endpoint para obtener la información básica de personas desde la base de datos.
 *     tags: [Persona]
 *     responses:
 *       200:
 *         description: Lista de personas obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_persona:
 *                     type: integer
 *                     description: ID de la persona.
 *                   identificacion:
 *                     type: string
 *                     description: Identificación de la persona.
 *                   nombre_completo:
 *                     type: string
 *                     description: Nombre completo de la persona.
 *       500:
 *         description: Error del servidor al intentar obtener la lista de personas.
 */
export const getPersonasInfo = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const connection = await db.promise();

      const [personas] = await connection.execute(
        `SELECT
          P.id_persona,
          P.identificacion,
          P.nombre_completo
        FROM
          persona P
        LIMIT 10`
      );

      const listaPersonas = personas.map(({ id_persona, identificacion, nombre_completo }) => ({
        id_persona,
        identificacion,
        nombre_completo,
      }));

      resolve(listaPersonas);
    } catch (error) {
      console.error('Error en getPersonasInfo:', error);
      reject(error);
    }
  });
};
