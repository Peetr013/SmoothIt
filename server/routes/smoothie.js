// routes/smoothieRoutes.js
const express = require('express');
const router = express.Router();
const smoothieController = require('../controllers/smoothie'); // Importujeme controller

// Route pro vytvoření nové objednávky (POST request)
router.post('/orders', smoothieController.createSmoothieOrder);

// Volitelné: Route pro získání všech objednávek (GET request)
router.get('/orders', smoothieController.getAllSmoothieOrders);

// Volitelné: Route pro získání jedné objednávky podle ID (GET request s parametrem)
router.get('/orders/:id', smoothieController.getSmoothieOrderById);


module.exports = router;