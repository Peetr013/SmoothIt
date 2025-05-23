const Car = require("../models/cars");

exports.getAllCars = async (req, res, next) => {
  try {
    const data = await Car.find();
    if (data && data.length !== 0) {
      return res.status(200).send({
        message: "cars found",
        payload: data,
      });
    }
    res.status(404).send({
      message: "cars not found",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
exports.getCarById = async (req, res, next) => {
  try {
    const data = await Car.findById(req.params.id);
    if (data) {
      return res.status(200).send({
        message: "car found",
        payload: data,
      });
    }
    res.status(404).send({
      message: "car not found",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
exports.createCar = async (req, res, next) => {  
    try {
        const data = new Car({
            name: req.body.name,
            brand: req.body.brand,
            color: req.body.color,
            price: req.body.price,
        })
        const result = await data.save();
        if (result) {
            return res.status(201).send({
                message: "car created",
                payload: result
            })
        }
        res.status(500).send({
            message: "not found",
        })
  } catch (err) {
    res.status(500).send(err);
  }
};
exports.updateCar = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
      brand: req.body.brand,
      color: req.body.color,
      price: req.body.price,
    };
    const result = await Car.findByIdAndUpdate(req.params.id, data);
    if (result) {
      return res.status(200).send({
        message: "Car updated",
        payload: result,
      });
    }
    res.status(500).send({
        message: "Car not updated",
    })
  } catch (err) {
    res.status(500).send(err);
  }
};
exports.deleteCar = async (req, res, next) => {
    try {
        const result = await Car.findByIdAndDelete(req.params.id);
        if (result) {
            return res.status(200).send({
                message: "car deleted",
                payload: result
            })
        }
        res.status(500).send({
            message: "cat not deleted",
        })
  } catch (err) {
    res.status(500).send(err);
  }
};
