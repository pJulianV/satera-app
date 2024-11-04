// backend/models/Medicamento.js
const mongoose = require('mongoose');

const medicamentoSchema = new mongoose.Schema({
    nombreMedicamento: { type: String, required: true },
    precio: { type: Number, required: true },
    unidadesRestantes: { type: Number, required: true }
});

module.exports = mongoose.model('Medicamento', medicamentoSchema);