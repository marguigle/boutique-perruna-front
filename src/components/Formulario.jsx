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
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    setErrorMessage("");
    setSuccessMessage("");

    if (!name || !race || !owner || !age || !image) {
      setErrorMessage("❌ Todos los campos son obligatorios.");
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
        setSelectedDog(data.newDog);
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

      setSuccessMessage(
        `✅ Éxito al ${accion} al perro: ${data?.newDog?.name || data?.name || name}`,
      );
      setDogs(await fetchDogs());
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
      setErrorMessage(`❌ Error: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!selectedDog) {
      setErrorMessage("❌ Debes seleccionar un perro para eliminar.");
      return;
    }

    try {
      await deleteDog(selectedDog._id);
      setSuccessMessage(`✅ Perro eliminado con éxito`);
      setDogs(await fetchDogs());
      setSelectedDog(null);
      setName("");
      setRace("");
      setOwner("");
      setAge(0);
      setImage("");
    } catch (error) {
      setErrorMessage(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-beige-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Gestionar Huéspedes
          </h1>
          <p className="text-xl text-warm-700">
            Agrega, edita o elimina información de perros
          </p>
        </div>

        {/* Mensajes */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg animate-slide-up">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg animate-slide-up">
            {errorMessage}
          </div>
        )}

        {/* Card del formulario */}
        <div className="bg-white rounded-3xl shadow-elevated overflow-hidden backdrop-blur-sm bg-white/95 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Selector de perro */}
            <div>
              <label className="block text-sm font-bold text-beige-700 mb-2">
                Seleccionar Perro (para editar)
              </label>
              <select
                className="w-full px-4 py-3 rounded-xl border-2 border-warm-200 bg-warm-50 focus:border-beige-500 focus:bg-white transition-all duration-300 font-medium"
                onChange={handleSelectDog}
                value={selectedDog ? selectedDog._id : ""}
              >
                <option value="">-- Seleccionar Perro --</option>
                {dogs.map((dog) => (
                  <option key={dog._id} value={dog._id}>
                    {dog.name} ({dog.race})
                  </option>
                ))}
              </select>
            </div>

            {/* Grid de formulario */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-bold text-beige-700 mb-2">
                  Nombre 🐕
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-warm-200 bg-warm-50 focus:border-beige-500 focus:bg-white transition-all duration-300 font-medium"
                  placeholder="Nombre del perro"
                />
              </div>

              {/* Raza */}
              <div>
                <label className="block text-sm font-bold text-beige-700 mb-2">
                  Raza 🦴
                </label>
                <input
                  type="text"
                  value={race}
                  onChange={(e) => setRace(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-warm-200 bg-warm-50 focus:border-beige-500 focus:bg-white transition-all duration-300 font-medium"
                  placeholder="Ej: Labrador, Pastor Alemán"
                />
              </div>

              {/* Dueño */}
              <div>
                <label className="block text-sm font-bold text-beige-700 mb-2">
                  Dueño 👤
                </label>
                <input
                  type="text"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-warm-200 bg-warm-50 focus:border-beige-500 focus:bg-white transition-all duration-300 font-medium"
                  placeholder="Nombre del dueño"
                />
              </div>

              {/* Edad */}
              <div>
                <label className="block text-sm font-bold text-beige-700 mb-2">
                  Edad 🎂
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-warm-200 bg-warm-50 focus:border-beige-500 focus:bg-white transition-all duration-300 font-medium"
                  placeholder="Años"
                  min="0"
                  max="50"
                />
              </div>
            </div>

            {/* Foto */}
            <div>
              <label className="block text-sm font-bold text-beige-700 mb-2">
                Foto 📸
              </label>
              <DropzoneUploader setImage={setImage} />
              {image && (
                <div className="mt-4">
                  <img
                    src={image}
                    alt="preview"
                    className="w-32 h-32 object-cover rounded-xl shadow-soft"
                  />
                </div>
              )}
            </div>

            {/* Checkboxes */}
            <div className="bg-warm-50 p-6 rounded-xl space-y-3">
              <h3 className="font-bold text-beige-700 mb-4">
                Estado de Salud ✨
              </h3>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="vacunado"
                  checked={vacunado}
                  onChange={(e) => setVacunado(e.target.checked)}
                  className="w-5 h-5 rounded-md"
                />
                <label
                  htmlFor="vacunado"
                  className="text-warm-700 font-medium cursor-pointer"
                >
                  Vacunado 💉
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="antiparasitario"
                  checked={antiparasitario}
                  onChange={(e) => setAntiparasitario(e.target.checked)}
                  className="w-5 h-5 rounded-md"
                />
                <label
                  htmlFor="antiparasitario"
                  className="text-warm-700 font-medium cursor-pointer"
                >
                  Desparasitado 🛡️
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="castrado"
                  checked={castrado}
                  onChange={(e) => setCastrado(e.target.checked)}
                  className="w-5 h-5 rounded-md"
                />
                <label
                  htmlFor="castrado"
                  className="text-warm-700 font-medium cursor-pointer"
                >
                  Castrado ♥️
                </label>
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                onClick={() => setAccion("agregar")}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-soft"
              >
                ✓ Agregar
              </button>
              <button
                type="submit"
                onClick={() => setAccion("actualizar")}
                disabled={!selectedDog}
                className="flex-1 bg-gradient-button hover:shadow-warm text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-soft disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ✏️ Actualizar
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={!selectedDog}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-soft disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🗑️ Eliminar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
