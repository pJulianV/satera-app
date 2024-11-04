// backend/server.js
const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const routes = require('./routes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Para parsear JSON

// Rutas de la API
app.use('/api', routes);

// Middleware para servir archivos estáticos (frontend)
app.use(express.static(path.join(__dirname, '../frontend')));

// Ruta para la raíz (opcional)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html')); // Sirve el archivo index.html
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});