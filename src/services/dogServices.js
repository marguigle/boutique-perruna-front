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
