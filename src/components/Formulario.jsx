import { useState, useEffect } from "react";
import {
  fetchDogs,
  addDog,
  updateDog,
  deleteDog,
} from "../services/dogServices.js";
import DropzoneUploader from "../DropzoneUploader.jsx";

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
    <div className="bg-gray-300 flex justify-center rounded-2xl">
      <form className="flex flex-col m-3" onSubmit={handleSubmit}>
        {/* <label className=" text-center">Seleccionar un perro:</label> */}
        <select
          className="rounded-md bg-white px-2 py-1.5 m-2 "
          onChange={handleSelectDog}
          value={selectedDog ? selectedDog._id : ""}
        >
          <option value="">-- seleccionar Perro --</option>
          {dogs.map((dog) => (
            <option key={dog._id} value={dog._id}>
              {dog.name}
            </option>
          ))}
        </select>

        {/* <label className="text-center">Nombre:</label> */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-md bg-white px-2 py-1.5 m-2 "
          placeholder="Ingresa el nombre"
        />

        {/* <label className="text-center">Raza:</label> */}
        <input
          type="text"
          value={race}
          onChange={(e) => setRace(e.target.value)}
          className="rounded-md bg-white px-2 py-1.5 m-2 "
          placeholder="Ingresa la raza"
        />

        {/* <label className="text-center">Dueño:</label> */}
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="rounded-md bg-white px-2 py-1.5 m-2 "
          placeholder="Ingresa el nombre del dueño"
        />

        {/* <label className="text-center">Edad:</label> */}
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="rounded-md bg-white px-2 py-1.5 m-2 "
          placeholder="Ingresa la edad"
        />

        {/* <label className="text-center"> Arrastra la foto </label> */}
        {/*    <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="form-control w-75"
          placeholder="Ingresa la URL de la foto"
        /> */}

        <DropzoneUploader setImage={setImage} />
        {image && (
          <img
            src={image}
            alt="preview"
            className="mt-3"
            style={{ width: "100px" }}
          />
        )}

        <div className="flex gap-4 my-4">
          <label className="">Vacunado</label>
          <input
            type="checkbox"
            checked={vacunado}
            onChange={(e) => setVacunado(e.target.checked)}
          />
          <label className="">Antiparasitario</label>
          <input
            type="checkbox"
            checked={antiparasitario}
            onChange={(e) => setAntiparasitario(e.target.checked)}
          />
          <label className=" ">Castrado</label>
          <input
            type="checkbox"
            checked={castrado}
            onChange={(e) => setCastrado(e.target.checked)}
          />
        </div>
        <div className=" flex justify-around">
          <button
            type="submit"
            className="bg-green-500 m-1 p-2 rounded-md"
            onClick={() => setAccion("agregar")}
          >
            Agregar
          </button>
          <button
            type="submit"
            className="bg-amber-400 m-1 p-2 rounded-md"
            onClick={() => setAccion("actualizar")}
            disabled={!selectedDog}
          >
            Actualizar
          </button>
          <button
            type="button"
            className="bg-red-500 m-1 p-2 rounded-md"
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
