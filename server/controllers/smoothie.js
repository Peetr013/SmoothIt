// controllers/smoothieController.js
// controllers/smoothieController.js
const Smoothie = require('../models/smoothie');

// Funkce pro vytvoření nové objednávky smoothie (zůstává stejná, ale použije nové schema)
exports.createSmoothieOrder = async (req, res) => {
    try {
        const { ingredients, price } = req.body;

        if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
            return res.status(400).json({ message: 'Ingredients array is required and cannot be empty.' });
        }
        const isValidIngredients = ingredients.every(item => typeof item === 'string');
        if (!isValidIngredients) {
             return res.status(400).json({ message: 'Each ingredient in the array must be a string (its name).' });
        }

        if (typeof price !== 'number' || price < 0) {
            return res.status(400).json({ message: 'Price must be a non-negative number.' });
        }

        const newSmoothieOrder = new Smoothie({
            ingredients: ingredients,
            price: price,
            // status se nastaví automaticky na 'preparing' díky default hodnotě v schematu
            // orderedAt se nastaví automaticky díky default hodnotě v schematu
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

// Funkce pro získání všech objednávek (upravíme, aby vracela i status a orderedAt)
exports.getAllSmoothieOrders = async (req, res) => {
    try {
        const orders = await Smoothie.find({}).sort({ orderedAt: 1 }); // Seřadíme podle data objednávky
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching smoothie orders:', error);
        res.status(500).json({ message: 'Failed to retrieve smoothie orders.', error: error.message });
    }
};

// NOVÁ FUNKCE: Aktualizace stavu objednávky
exports.updateSmoothieOrderStatus = async (req, res) => {
    try {
        const { id } = req.params; // ID objednávky z URL parametru
        const { status } = req.body; // Nový status z těla požadavku

        // Validace stavu
        if (!status || !['preparing', 'done', 'canceled'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status provided. Must be "preparing", "done", or "canceled".' });
        }

        // Najdeme a aktualizujeme objednávku
        const updatedOrder = await Smoothie.findByIdAndUpdate(
            id,
            { status: status },
            { new: true, runValidators: true } // {new: true} vrátí aktualizovaný dokument, {runValidators: true} zajistí validaci
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Smoothie order not found.' });
        }

        res.status(200).json({
            message: `Order ${id} status updated to ${status}.`,
            order: updatedOrder
        });

    } catch (error) {
        console.error('Error updating smoothie order status:', error);
        res.status(500).json({ message: 'Failed to update smoothie order status.', error: error.message });
    }
};

// Funkce pro získání jedné objednávky podle ID (zůstává stejná)
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