import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateCar, getCarById } from "../../models/Car";

export default function CarUpdateForm() {
  const { id } = useParams();
  const [ car, setCar ] = useState();
  const [ isLoaded, setLoaded ] = useState();
  const [ info, setInfo ] = useState();
  const [ formData, setFormData ] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getCarById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setCar(data.payload);
      setLoaded(true);
    }
  };

  const updateForm = async () => {
    const data = await updateCar(id, formData);
    if (data.status === 200) return navigate(`/car/${id}`);
    setInfo(data.message);
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    updateForm();
  }

  useEffect(() => {
    load();
  }, []);

  if (isLoaded === null) {
    return (
      <>
        <p>Car not found</p>
      </>
    )
  }

  if (!isLoaded) {
    return (
      <>
        <p>Car is loading...</p>
      </>
    )
  }

  return (
    <>
      <h1>Car update form</h1>
      <p>{id}</p>
      <form>
      <input type="text" name="name" required placeholder="Enter name" onChange={handleChange} defaultValue={car.name}/>
        <input type="text" name="brand" required placeholder="Enter brand" onChange={handleChange} defaultValue={car.brand}/>
        <input type="text" name="color" required placeholder="Enter color" onChange={handleChange} defaultValue={car.color}/>
        <input type="number" name="price" required placeholder="Enter price" onChange={handleChange} defaultValue={car.price}/>
        <button onClick={handleUpdate}>
          Update Car
        </button>
      </form>
    </>
  )
}
