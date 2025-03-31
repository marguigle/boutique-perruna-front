import { useState } from "react";

const Formulario = () => {
  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [owner, setOwner] = useState("");
  const [age, setAge] = useState(0);
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !race || !owner || !age || !image) {
      alert("❌ Todos los campos son obligatorios.");
      return;
    }

    const nuevoPerro = { name, race, owner, age, image };
    console.log("Datos a enviar:", nuevoPerro);
    try {
      const respuesta = await fetch("http://localhost:5000/api/dogs/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoPerro),
      });

      console.log(respuesta);
      if (!respuesta.ok) {
        throw new Error("Error al guardar el perro");
      }
      const data = await respuesta.json();
      alert(`🐶 Perro guardado con éxito: ${data.nombre}`);
      setName("");
      setRace("");
      setOwner("");
      setAge(0);
      setImage("");
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form
        className="d-flex flex-column align-items-center text-center bg-secondary p-4 rounded w-75"
        onSubmit={handleSubmit}
      >
        <label className="form-label text-info">Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control w-75"
          placeholder="Ingresa el nombre"
        />
        <label className="form-label text-info">Raza:</label>
        <input
          type="text"
          value={race}
          onChange={(e) => setRace(e.target.value)}
          className="form-control w-75"
          placeholder="Ingresa la raza"
        />
        <label className="form-label text-info">Dueño:</label>
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="form-control w-75"
          placeholder="Ingresa el nombre del dueño"
        />
        <label className="form-label text-info">Edad:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="form-control w-75"
          placeholder="Ingresa la edad"
        />
        <label className="form-label text-info">URL Foto:</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="form-control w-75"
          placeholder="Ingresa la URL de la foto"
        />
        <button type="submit" className="btn btn-primary mt-4 w-50">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Formulario;
