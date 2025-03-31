import React, { useEffect, useState } from "react";
import { fetchDogs } from "../services/dogServices";

const ListaPerros = () => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const obtenerPerros = async () => {
      try {
        const perros = await fetchDogs(); // Llamada a la API

        if (Array.isArray(perros)) {
          // 👈 Validar que es un array antes de setDogs
          setDogs(perros);
        } else {
          console.error("fetchDogs no devolvió un array:", perros);
        }

        // setDogs(perros); // Actualizar el estado con los datos recibidos
      } catch (error) {
        console.error("Error al obtener perros:", error);
      }
    };

    obtenerPerros();
  }, []);

  return (
    <div>
      <h2>Lista de Perros</h2>
      {dogs.length === 0 ? (
        <p>No hay perros disponibles.</p> // 👈 Mensaje si la lista está vacía
      ) : (
        <ul>
          {dogs.map((dog) => (
            <li key={dog._id}>
              {dog.name} - {dog.race}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaPerros;
