// controllers/smoothieController.js
const Smoothie = require('../models/smoothie'); // Importujeme tvůj model

// Funkce pro vytvoření nové objednávky smoothie



exports.createSmoothieOrder = async (req, res) => {
    try {
        const { ingredients, price } = req.body;

        // Základní validace dat
        if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
            return res.status(400).json({ message: 'Ingredients array is required and cannot be empty.' });
        }
        // Nová validace: Každá položka v ingredients musí být string
        const isValidIngredients = ingredients.every(item => typeof item === 'string');
        if (!isValidIngredients) {
             return res.status(400).json({ message: 'Each ingredient in the array must be a string (its name).' });
        }

        if (typeof price !== 'number' || price < 0) {
            return res.status(400).json({ message: 'Price must be a non-negative number.' });
        }

        const newSmoothieOrder = new Smoothie({
            ingredients: ingredients, // Nyní toto pole obsahuje jen stringy (názvy)
            price: price,
        });

        const savedOrder = await newSmoothieOrder.save();

        res.status(201).json({
            message: 'Smoothie order created successfully!',
            order: savedOrder
        });

    } catch (error) {
        console.error('Error creating smoothie order:', error);
        res.status(500).json({ message: 'Failed to create smoothie order.', error: error.message });
    }
};

// Volitelné: Funkce pro získání všech objednávek (pro administraci)
exports.getAllSmoothieOrders = async (req, res) => {
    try {
        const orders = await Smoothie.find({}); // Najde všechny objednávky
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching smoothie orders:', error);
        res.status(500).json({ message: 'Failed to retrieve smoothie orders.', error: error.message });
    }
};

// Volitelné: Funkce pro získání jedné objednávky podle ID
exports.getSmoothieOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Smoothie.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Smoothie order not found.' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching smoothie order by ID:', error);
        res.status(500).json({ message: 'Failed to retrieve smoothie order.', error: error.message });
    }
};