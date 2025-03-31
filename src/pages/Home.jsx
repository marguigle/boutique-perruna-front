import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
function Home() {
  const [perros, setPerros] = useState([]);

  const obtenerPerrosApi = async () => {
    try {
      const respuesta = await fetch(
        "https://dog.ceo/api/breeds/image/random/10"
      );
      const data = await respuesta.json();
      setPerros(data.message);
    } catch (error) {
      console.error("Error al obtener imágenes:", error);
    }
  };

  useEffect(() => {
    obtenerPerrosApi();
  }, []);

  return (
    <div className="justify-center">
      <Carousel className="d-flex justify-center">
        {perros.map((imagen, index) => (
          <Carousel.Item
            key={index}
            style={{
              maxWidth: "1280px",
              maxHeight: "600px",
              objectFit: "cover",
              objectPosition: "center",
            }}
          >
            <img className="d-block w-100" src={imagen} alt="Perro" />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Home;
