import React, { useEffect, useState } from "react";
import { fetchDogs } from "../services/dogServices";

const ListaPerros = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerPerros = async () => {
      try {
        const perros = await fetchDogs();
        if (Array.isArray(perros)) {
          setDogs(perros);
          console.log("Perros cargados:", perros);
        } else {
          console.error("fetchDogs no devolvió un array:", perros);
        }
      } catch (error) {
        console.error("Error al obtener perros:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerPerros();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-bounce-soft">
          <span className="text-6xl">🐕</span>
          <p className="text-xl text-beige-700 font-semibold mt-4">
            Cargando huéspedes...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-beige-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Nuestros Huéspedes
          </h1>
          <p className="text-xl text-warm-700">
            Conoce a todas nuestras adorables mascotas
          </p>
        </div>

        {/* Grid de tarjetas */}
        {dogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-warm-600">No hay perros disponibles.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dogs.map((dog, idx) => (
              <div
                key={dog.id}
                className="group animate-slide-up overflow-hidden rounded-3xl shadow-soft hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2 bg-white backdrop-blur-sm bg-white/95"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                {/* Imagen con overlay */}
                <div className="relative overflow-hidden h-72 bg-gradient-warm">
                  <img
                    src={dog.image}
                    alt={dog.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Badge con nombre */}
                  <div className="absolute top-4 right-4 bg-gradient-button px-4 py-2 rounded-full text-white font-bold shadow-warm">
                    {dog.race}
                  </div>

                  {/* Overlay con icono */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <span className="text-6xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-50">
                      🐕
                    </span>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-beige-700 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                    {dog.name}
                  </h3>

                  {/* Grid de información */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
                      <span className="text-xl">👤</span>
                      <div>
                        <p className="text-xs text-warm-600 uppercase font-semibold">
                          Dueño
                        </p>
                        <p className="text-warm-900 font-bold">{dog.owner}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl">
                      <span className="text-xl">🎂</span>
                      <div>
                        <p className="text-xs text-warm-600 uppercase font-semibold">
                          Edad
                        </p>
                        <p className="text-warm-900 font-bold">
                          {dog.age} años
                        </p>
                      </div>
                    </div>

                    {/* Badges de estado */}
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-orange-100">
                      {dog.vacunado && (
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                          ✓ Vacunado
                        </span>
                      )}
                      {dog.antiparasitario && (
                        <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                          ✓ Desparasitado
                        </span>
                      )}
                      {dog.castrado && (
                        <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">
                          ✓ Castrado
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaPerros;
