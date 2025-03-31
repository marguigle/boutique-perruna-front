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
    <div className="container d-flex flex-wrap gap-4 justify-center ">
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
              borderRadius: "8px",
              boxShadow: "5px 10px 10px #737874",
            }}
            key={dog.id}
          >
            <img
              src="/pug-dog-isolated-white-background.jpg"
              className="card-img-top "
              style={{ width: "80px;" }}
              alt="..."
            />
            <div className=" card-body">
              <h5 className="card-title">{dog.name}</h5>{" "}
              {/* 👈 Corrección aquí */}
              <p className="card-text">{`Raza: ${dog.race}`} </p>
              <p className="card-text">{`Dueño: ${dog.owner}`}</p>
              <p className="card-text">{`Edad: ${dog.age}`}</p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ListaPerros;
