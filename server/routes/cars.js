const express = require('express');
const router = express.Router();

const carsRouter = require("../controllers/cars")

router.get('/', carsRouter.getAllCars);

router.get('/:id', carsRouter.getCarById);

router.post('/', carsRouter.createCar);

router.put('/:id', carsRouter.updateCar);

router.delete('/:id', carsRouter.deleteCar);

module.exports = router;
