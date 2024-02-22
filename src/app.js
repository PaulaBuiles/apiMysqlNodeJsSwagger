// app.js
import express from 'express';
import db from './config/db.js';
import indexRouter from './routes/index.route.js';
import empresaPersonaRouter from './services/empresa_persona.service.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc'; 
import personRouter from './routes/person.route.js';
import vehiculoRouter from './services/vehiculo.service.js';
import session from 'express-session';
import bodyParser from 'body-parser'; 
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;

import crypto from 'crypto';

const secretKey = crypto.randomBytes(32).toString('hex');

app.use(cookieParser());

app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 60000
  }
}));

app.use(bodyParser.urlencoded({ extended: true }));

// // Middleware para redirigir a /login si no hay una sesión activa
// app.use((req, res, next) => {
//   if (!req.session.user && req.path !== '/login') {
//     console.log('No active session. Redirecting to /login');
//     return res.redirect('/login');
//   }
//   return next();
// });

// Conexión a la base de datos


// Configuración de Swagger
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NodeJs MySQL API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: [`${path.join(__dirname, './services/*.js')}`],
});

// Configuracion de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ruta de login
//app.use('/login', loginRouter);

// Rutas principales
//app.use(authenticateApiKey);
app.use('/api', indexRouter);
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/api/persona', personRouter);
app.use('/api', empresaPersonaRouter);
app.use('/api/vehiculo', vehiculoRouter);


// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
