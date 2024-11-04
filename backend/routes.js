// backend/routes.js
const express = require('express');
const Medicamento = require('./models/Medicamento');
const router = express.Router();

// Crear un medicamento
router.post('/medicamentos', async (req, res) => {
    const { nombreMedicamento, precio, unidadesRestantes } = req.body;
    const nuevoMedicamento = new Medicamento({ nombreMedicamento, precio, unidadesRestantes });
    try {
        const medicamentoGuardado = await nuevoMedicamento.save();
        res.status(201).json(medicamentoGuardado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Leer todos los medicamentos
router.get('/medicamentos', async (req, res) => {
    try {
        const medicamentos = await Medicamento.find();
        res.json(medicamentos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar un medicamento
router.put('/medicamentos/:id', async (req, res) => {
    try {
        const medicamentoActualizado = await Medicamento.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(medicamentoActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar un medicamento
router.delete('/medicamentos/:id', async (req, res) => {
    try {
        await Medicamento.findByIdAndDelete(req.params.id);
        res.json({ message: 'Medicamento eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;