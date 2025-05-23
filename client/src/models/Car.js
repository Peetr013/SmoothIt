

export const getAllCars = async () => {
    const req = await fetch("http://localhost:3000/cars", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: "GET"
    });
    const data = await req.json();
    return {
        status: req.status,
        payload: data.payload,
        message: data.message
    }
}
export const getCarById = async (id) => {
    const req = await fetch(`http://localhost:3000/cars/${id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: "GET"
    });
    const data = await req.json();
    return {
        status: req.status,
        payload: data.payload,
        message: data.message
    }
}
export const createCar = async (formData) => {
    const req = await fetch(`http://localhost:3000/cars`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(formData)
    });
    const data = await req.json();
    return {
        status: req.status,
        payload: data.payload,
        message: data.message
    }
}
export const updateCar = async (id, formData) => {
    const req = await fetch(`http://localhost:3000/cars/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(formData)
      });
      const data = await req.json();
      return {
        status: req.status,
        payload: data.payload,
        message: data.message,
      };
};
export const deleteCar = async (id) => {
    const req = await fetch(`http://localhost:3000/cars/${id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: "DELETE"
    });
    const data = await req.json();
    return {
        status: req.status,
        payload: data.payload,
        message: data.message
    }
}