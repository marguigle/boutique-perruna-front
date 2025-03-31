import { useState, useEffect } from "react";
import {
  fetchDogs,
  addDog,
  updateDog,
  deleteDog,
} from "../services/dogServices.js";

const Formulario = () => {
  const [dogs, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);
  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [owner, setOwner] = useState("");
  const [age, setAge] = useState(0);
  const [image, setImage] = useState("");
  const [accion, setAccion] = useState("agregar");

  useEffect(() => {
    const obtenerPerros = async () => {
      const perros = await fetchDogs();
      setDogs(perros);
    };
    obtenerPerros();
  }, []);

  const handleSelectDog = (e) => {
    const dogId = e.target.value;
    const dog = dogs.find((d) => d._id === dogId);
    setSelectedDog(dog);
    if (dog) {
      setName(dog.name);
      setRace(dog.race);
      setOwner(dog.owner);
      setAge(dog.age);
      setImage(dog.image);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !race || !owner || !age || !image) {
      alert("❌ Todos los campos son obligatorios.");
      return;
    }

    const nuevoPerro = { name, race, owner, age, image };

    try {
      let data;
      if (accion === "actualizar" && selectedDog) {
        data = await updateDog(selectedDog._id, nuevoPerro);
      } else {
        data = await addDog(nuevoPerro);
      }

      alert(`✅ Perro ${accion} con éxito: ${data.name}`);
      setDogs(await fetchDogs()); // Recargar lista de perros
      setSelectedDog(null);
      setName("");
      setRace("");
      setOwner("");
      setAge(0);
      setImage("");
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    if (!selectedDog) {
      alert("❌ Debes seleccionar un perro para eliminar.");
      return;
    }

    try {
      await deleteDog(selectedDog._id);
      alert(`✅ Perro eliminado con éxito`);
      setDogs(await fetchDogs()); // Recargar lista
      setSelectedDog(null);
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
        <label className="form-label text-info mt-1 text-start d-block">
          Seleccionar un perro:
        </label>
        <select
          className="form-select w-75"
          onChange={handleSelectDog}
          value={selectedDog ? selectedDog._id : ""}
        >
          <option value="">-- Nuevo Perro --</option>
          {dogs.map((dog) => (
            <option key={dog._id} value={dog._id}>
              <span className="fw-bolder">{dog.name}</span>
            </option>
          ))}
        </select>

        <label className="form-label text-info mt-1 text-start d-block">
          Nombre:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control w-75"
          placeholder="Ingresa el nombre"
        />

        <label className="form-label text-info mt-1 text-start d-block">
          Raza:
        </label>
        <input
          type="text"
          value={race}
          onChange={(e) => setRace(e.target.value)}
          className="form-control w-75"
          placeholder="Ingresa la raza"
        />

        <label className="form-label text-info mt-1 text-start d-block">
          Dueño:
        </label>
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="form-control w-75"
          placeholder="Ingresa el nombre del dueño"
        />

        <label className="form-label text-info mt-1 text-start d-block">
          Edad:
        </label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="form-control w-75"
          placeholder="Ingresa la edad"
        />

        <label className="form-label text-info mt-1 text-start d-block">
          URL Foto:
        </label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="form-control w-75"
          placeholder="Ingresa la URL de la foto"
        />

        <div className="d-flex justify-content-evenly w-100 mt-4">
          <button
            type="submit"
            className="btn btn-primary w-30"
            onClick={() => setAccion("agregar")}
          >
            Agregar
          </button>
          <button
            type="submit"
            className="btn btn-warning w-30"
            onClick={() => setAccion("actualizar")}
            disabled={!selectedDog}
          >
            Actualizar
          </button>
          <button
            type="button"
            className="btn btn-danger w-30"
            onClick={handleDelete}
            disabled={!selectedDog}
          >
            Eliminar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Formulario;
