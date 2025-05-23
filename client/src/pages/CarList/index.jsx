import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllCars } from "../../models/Car";
import CarLink from "./CarLink";

export default function Home() {
  const [cars, setCars] = useState();
  const [isLoaded, setLoaded] = useState(false);

  const load = async () => {
    const data = await getAllCars();
    if (data.status === 404 || data.status === 500) return setLoaded(null);
    if (data.status === 200) {
      setCars(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
  }, [])

  if (isLoaded === null) {
    return (
      <>
        <p>Cars not found</p>
      </>
    )
  }

  if (!isLoaded) {
    return (
      <>
        <p>Loading...</p>
      </>
    )
  }

  if (isLoaded) {
    return (
      <>
        <h1>Car list</h1>
        {
          cars.map((car, index) => (
            <CarLink key={index} {...car} />
          ))
        }

        <Link to={"/"}>
          <p>Go home</p>
        </Link>
      </>
    )
  }
}
