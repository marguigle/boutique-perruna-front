import React from "react";
import { useEffect, useState } from "react";

const ListaPerros = () => {
  const [dogs, setDogs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/dogs") // Llamar a la API
      .then((res) => res.json())
      .then((data) => setDogs(data.dogs)) // Guardar los datos en el estado
      .catch((error) => console.error("Error al obtener perros:", error));
  }, []);

  return (
    <div>
      <h2>Lista de Perros</h2>
      <ul>
        {dogs.map((dog) => (
          <li key={dog._id}>
            {dog.name} - {dog.race}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaPerros;
