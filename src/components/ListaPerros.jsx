import React, { useEffect, useState } from "react";
import { fetchDogs } from "../services/dogServices";

const ListaPerros = () => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const obtenerPerros = async () => {
      try {
        const perros = await fetchDogs(); // Llamada a la API

        if (Array.isArray(perros)) {
          setDogs(perros);
          console.log("Perros cargados:", perros);
        } else {
          console.error("fetchDogs no devolvió un array:", perros);
        }
      } catch (error) {
        console.error("Error al obtener perros:", error);
      }
    };

    obtenerPerros();
  }, []);

  return (
    <div className="container d-flex flex-wrap gap-4 justify-center  ">
      {dogs.length === 0 ? (
        <p>No hay perros disponibles.</p>
      ) : (
        dogs.map((dog) => (
          <div
            className=""
            style={{
              width: "40vw",
              background: "#ffe729",
              border: "2px solid black",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
              borderRadius: "8px",
              boxShadow: "5px 10px 10px #737874",
            }}
            key={dog.id}
          >
            <img
              src={dog.image}
              alt={dog.name}
              style={{
                maxWidth: "500px",
                height: "500px",
                borderRadius: "8px",
              }}
              className="card-img-top m-1 "
            />

            <div className=" card-body w-full ">
              <h5 className="card-title m-1">{dog.name}</h5>

              <p className="card-text"> Raza: {dog.race} </p>
              <p className="card-text">{`Dueño:      ${dog.owner}`}</p>
              <p className="card-text">{`Edad: ${dog.age}`}</p>
              <p className="card-text">{`Vacunado: ${
                dog.vacunado ? "Si" : "No"
              }`}</p>
              <p className="card-text">{`antiparasitario: ${
                dog.antiparasitario ? "Si" : "No"
              }`}</p>
              <p className="card-text">{`Castrado: ${
                dog.castrado ? "Si" : "No"
              }`}</p>
              {/* <a href="#" className="btn btn-primary">
                Go somewhere
              </a> */}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ListaPerros;
