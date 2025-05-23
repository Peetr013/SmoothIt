import { Link } from "react-router-dom";

import React from 'react'

export default function Home() {
  return (
    <>
        <Link to={"/add-car"}>
            <p>Add car</p>
        </Link>

        <Link to={"/view-cars"}>
            <p>View car</p>
        </Link>
    </>
  )
}
