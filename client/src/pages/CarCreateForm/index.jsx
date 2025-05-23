import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createCar } from "../../models/Car";

import React from 'react'

export default function CarCreateForm() {
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const postForm = async () => {
    const car = await createCar(formData);
    if (car.status === 201) {
      return navigate();
    }
    setInfo(car.message)
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handlePost = (e) => {
    e.preventDefault();
    postForm();
  }

  return (
    <>
      <h1>Create car</h1>
      <form>
        <input type="text" name="name" required placeholder="Enter name" onChange={handleChange}/>
        <input type="text" name="brand" required placeholder="Enter brand" onChange={handleChange}/>
        <input type="text" name="color" required placeholder="Enter color" onChange={handleChange}/>
        <input type="number" name="price" required placeholder="Enter price" onChange={handleChange}/>
        <button onClick={handlePost}>
          Add Car
        </button>
      </form>
      <p>{info}</p>
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  )
}
