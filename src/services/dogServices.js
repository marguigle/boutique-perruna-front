const API_URL = "http://localhost:5000/api/dogs";

export const fetchDogs = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener los perros");

    const data = await response.json();
    return data.dogs || [];
  } catch (error) {
    console.error("Error en fetchDogs", error);
    return [];
  }
};
export const addDog = async (dogData) => {
  try {
    const respuesta = await fetch(API_URL + "/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dogData),
    });
    if (!respuesta.ok) throw new Error("Error al agregar el perro");
    return await respuesta.json();
  } catch (error) {
    console.error("Error en addDog:", error);
    throw error;
  }
};
/////////////funcionde agregar

// const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!name || !race || !owner || !age || !image) {
//           alert("❌ Todos los campos son obligatorios.");
//           return;
//         }

//         const nuevoPerro = { name, race, owner, age, image };
//         console.log("Datos a enviar:", nuevoPerro);
//         try {
//           const respuesta = await fetch("http://localhost:5000/api/dogs/add", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(nuevoPerro),
//           });

//           console.log(respuesta);
//           if (!respuesta.ok) {
//             throw new Error("Error al guardar el perro");
//           }
//           const data = await respuesta.json();
//           alert(`🐶 Perro guardado con éxito: ${data.nombre}`);
//           setName("");
//           setRace("");
//           setOwner("");
//           setAge(0);
//           setImage("");
//         } catch (error) {
//           alert(`❌ Error: ${error.message}`);
//         }

//     }

////////////////////fin funcion de agragar

export const updateDog = async (id, dogData) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dogData),
    });
    if (!respuesta.ok) throw new Error("Error al actualizar el perro");
    return await respuesta.json();
  } catch (error) {
    console.error("Error en updateDog:", error);
    throw error;
  }
};
export const deleteDog = async (id) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!respuesta.ok) throw new Error("Error al eliminar el perro");
    return await respuesta.json();
  } catch (error) {
    console.error("Error en deleteDog:", error);
    throw error;
  }
};
