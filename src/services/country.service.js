import db from "../config/db.js";

//Se hacen todas als consultas a la base de datos
/**
 * @swagger
 * components:
 *   schemas:
 *     Country:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: El nombre del usuario
 *         capital:
 *           type: string
 *           description: La capital del país
 *         currency:
 *           type: string
 *           description: El tipo de moneda usada en el país
 *       required:
 *         - name
 *         - capital
 *         - currency
 *       example:
 *         name: Colombia
 *         capital: Bogota
 *         currency: COP
 */
/**
 * @swagger
 * /api/country:
 *   get:
 *     summary: Obtiene la lista de países.
 *     description: Endpoint para obtener la lista de países desde la base de datos.
 *     tags: [Country]
 *     responses:
 *       200:
 *         description: Lista de países obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del país.
 *                   name:
 *                     type: string
 *                     description: Nombre del país.
 *                   capital:
 *                     type: string
 *                     description: La capital del país
 *                   currency:
 *                      type: string
 *                      description: El tipo de moneda usada en el país
 *       500:
 *          description: Error del servidor al intentar obtener la lista de países.
 */
export const getCountries = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM country";

    db.execute(query)
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

/**
 * @swagger
 * /api/country/{id}:
 *   get:
 *     summary: Obtiene información detallada de un país por ID.
 *     description: Endpoint para obtener información detallada de un país desde la base de datos.
 *     tags: [Country]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del país a consultar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Información del país obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del país.
 *                 name:
 *                   type: string
 *                   description: Nombre del país.
 *                 capital:
 *                   type: string
 *                   description: La capital del país.
 *                 currency:
 *                   type: string
 *                   description: El tipo de moneda usada en el país.
 *       404:
 *         description: No se encontró el país con el ID especificado.
 *       500:
 *         description: Error del servidor al intentar obtener la información del país.
 */
export const getCountry = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM country WHERE id = ?";

    db.execute(query, [id])
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

/**
 * @swagger
 * /api/country:
 *   post:
 *     summary: Crea un nuevo país.
 *     description: Endpoint para crear un nuevo país en la base de datos.
 *     tags: [Country]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del país.
 *               capital:
 *                 type: string
 *                 description: La capital del país.
 *               currency:
 *                 type: string
 *                 description: El tipo de moneda usada en el país.
 *     responses:
 *       201:
 *         description: País creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del país creado.
 *                 name:
 *                   type: string
 *                   description: Nombre del país.
 *                 capital:
 *                   type: string
 *                   description: La capital del país.
 *                 currency:
 *                   type: string
 *                   description: El tipo de moneda usada en el país.
 *       400:
 *         description: Solicitud incorrecta, datos del país incompletos.
 *       500:
 *         description: Error del servidor al intentar crear el país.
 */
export const createCountry = (country) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO country (name, capital, currency) VALUES (?, ?, ?)";

    const { name, capital, currency } = country;

    db.execute(query, [name, capital, currency])
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

/**
 * @swagger
 * /api/country/{id}:
 *   put:
 *     summary: Actualiza un país existente.
 *     description: Endpoint para actualizar la información de un país existente en la base de datos.
 *     tags: [Country]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del país a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nuevo nombre del país.
 *               capital:
 *                 type: string
 *                 description: Nueva capital del país.
 *               currency:
 *                 type: string
 *                 description: Nuevo tipo de moneda usada en el país.
 *     responses:
 *       200:
 *         description: País actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del país actualizado.
 *                 name:
 *                   type: string
 *                   description: Nuevo nombre del país.
 *                 capital:
 *                   type: string
 *                   description: Nueva capital del país.
 *                 currency:
 *                   type: string
 *                   description: Nuevo tipo de moneda usada en el país.
 *       400:
 *         description: Solicitud incorrecta, datos del país incompletos.
 *       404:
 *         description: No se encontró el país con el ID proporcionado.
 *       500:
 *         description: Error del servidor al intentar actualizar el país.
 */
export const updateCountry = (id, country) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE country SET name = ?, capital = ?, currency = ? WHERE id = ?";

    const { name, capital, currency } = country;

    db.execute(query, [name, capital, currency, id])
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

/**
 * @swagger
 * /api/country/{id}:
 *   delete:
 *     summary: Elimina un país existente.
 *     description: Endpoint para eliminar un país existente en la base de datos.
 *     tags: [Country]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del país a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: País eliminado exitosamente.
 *       404:
 *         description: No se encontró el país con el ID proporcionado.
 *       500:
 *         description: Error del servidor al intentar eliminar el país.
 */
export const deleteCountry = (id) => {
  return new Promise((resolve, reject) => {
    const query =
      "DELETE FROM country WHERE id = ?";

    db.execute(query, [id])
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

