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
  const [vacunado, setVacunado] = useState(false);
  const [antiparasitario, setAntiparasitario] = useState(false);
  const [castrado, setCastrado] = useState("");
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
      setVacunado(Boolean(dog.vacunado));
      setAntiparasitario(Boolean(dog.antiparasitario));
      setCastrado(Boolean(dog.castrado));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !race ||
      !owner ||
      !age ||
      !image
      // !vacunado ||
      // !antiparasitario ||
      // !castrado
    ) {
      alert("❌ Todos los campos son obligatorios.");
      return;
    }

    const nuevoPerro = {
      name,
      race,
      owner,
      age,
      image,
      vacunado,
      antiparasitario,
      castrado,
    };

    try {
      let data;
      if (accion === "actualizar" && selectedDog) {
        data = await updateDog(selectedDog._id, nuevoPerro);
        setSelectedDog(data.newDog); // 🔁 volvemos a llenar el form con el nuevo perro
        setName(data.newDog.name);
        setRace(data.newDog.race);
        setOwner(data.newDog.owner);
        setAge(data.newDog.age);
        setImage(data.newDog.image);
        setVacunado(Boolean(data.newDog.vacunado));
        setAntiparasitario(Boolean(data.newDog.antiparasitario));
        setCastrado(Boolean(data.newDog.castrado));
      } else {
        data = await addDog(nuevoPerro);
        setSelectedDog(null);
        setName("");
        setRace("");
        setOwner("");
        setAge(0);
        setImage("");
        setVacunado(false);
        setAntiparasitario(false);
        setCastrado(false);
      }

      alert(
        `✅ Éxito al ${accion} al perro: ${
          data?.newDog?.name || data?.name || name
        }`
      );
      setDogs(await fetchDogs()); // Recargar lista de perros
      setSelectedDog(null);
      setName("");
      setRace("");
      setOwner("");
      setAge(0);
      setImage("");
      setVacunado(false);
      setAntiparasitario(false);
      setCastrado(false);
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

        <div className="d-flex gap-4">
          <label className="form-label text-info mt-1 text-start d-inline">
            Vacunado
          </label>
          <input
            type="checkbox"
            checked={vacunado}
            onChange={(e) => setVacunado(e.target.checked)}
          />
          <label className="form-label text-info mt-1 text-start d-inline">
            Antiparasitario
          </label>
          <input
            type="checkbox"
            checked={antiparasitario}
            onChange={(e) => setAntiparasitario(e.target.checked)}
          />
          <label className="form-label text-info mt-1 text-start d-inline ">
            Castrado
          </label>
          <input
            type="checkbox"
            checked={castrado}
            onChange={(e) => setCastrado(e.target.checked)}
          />
        </div>
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
