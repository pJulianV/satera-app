// backend/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI); // Eliminar opciones obsoletas
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;