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
    const cleanedData = {
      ...dogData,
      age: Number(dogData.age), // asegurarse que es un número
      vacunado: Boolean(dogData.vacunado),
      antiparasitario: Boolean(dogData.antiparasitario),
      castrado: Boolean(dogData.castrado),
    };

    const respuesta = await fetch(API_URL + "/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleanedData),
    });

    if (!respuesta.ok) {
      const errorData = await respuesta.json();
      console.error("Respuesta del backend:", errorData);
      throw new Error("Error al agregar el perro");
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error en addDog:", error);
    throw error;
  }
};

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
