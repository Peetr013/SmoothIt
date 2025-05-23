import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteCar, getCarById } from "../../models/Car";
import { useState, useEffect } from "react";

export default function CarView() {
  const { id } = useParams();
  const [car, setCar] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [info, setInfo] = useState();
  const [formData, setFormData] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getCarById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setCar(data.payload);
      setLoaded(true);
    }
  }

  const handleChange = (e) => {
    setFormData(e.target.value);
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    if (car.name === formData) {
      const data = await deleteCar(id);
      if (data.status === 200) {
        alert("Car deleted successfully!");
        navigate(`/`);
      } else {
        setInfo(data.message);
      }
    } else {
      setInfo("Špatný vstup");
    }
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
        <h1>Car view</h1>
        <p>{id}</p>
        <p>Název auta {car.name}</p>
        <p>Značka: {car.brand}</p>
        <p>Barva: {car.color}</p>
        <p>Cena: {car.price}</p>
        <form>
          <input type="text" placeholder={car.name} onChange={handleChange} />
          <button onClick={handleDelete}>Smazat auto</button>
        </form>
        <p>{info}</p>
        <Link to={`/update-car/${id}`}>
          <p>Aktualizovat auto</p>
        </Link>

        <Link to={"/"}>
          <p>Go home</p>
        </Link>
    </>
  )
}
