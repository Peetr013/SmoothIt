const express = require("express");
const router = express.Router();
const smoothieController = require("../controllers/smoothie");

router.post("/orders", smoothieController.createSmoothieOrder);

router.get("/orders", smoothieController.getAllSmoothieOrders);

router.get("/orders/:id", smoothieController.getSmoothieOrderById);

router.put("/orders/:id/status", smoothieController.updateSmoothieOrderStatus);

module.exports = router;
