import { Carousel } from "react-bootstrap";

function Home() {
  const perros = [
    { id: 1, ruta: "/20130628_232734.jpg" },
    {
      id: 2,
      ruta: "/Imagen de WhatsApp 2025-04-05 a las 14.01.53_c812ff7e.jpg",
    },
    {
      id: 3,
      ruta: "/Imagen de WhatsApp 2025-04-05 a las 14.02.31_9888a575.jpg",
    },
    { id: 4, ruta: "/IMG_20221217_225533305_MP.jpg" },
    { id: 5, ruta: "/IMG_20240928_150904097_HDR.jpg" },
    { id: 6, ruta: "/IMG_20250405_140049973.jpg" },
    { id: 7, ruta: "/IMG_20250405_140109943.jpg" },
    { id: 8, ruta: "/IMG-20180911-WA0004.jpg" },
    { id: 9, ruta: "/IMG-20181105-WA0030.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft pt-8">
      {/* Sección Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-beige-600 to-orange-600 bg-clip-text text-transparent mb-4">
            ¡Bienvenido a Perruna Boutique!
          </h1>
          <p className="text-xl text-warm-700 max-w-2xl mx-auto leading-relaxed">
            El mejor lugar para el cuidado, hospedaje y bienestar de tus
            mascotas. Contamos con profesionales dedicados a darles amor y
            atención especial.
          </p>
        </div>

        {/* Carousel moderno */}
        <div className="flex justify-center items-center mb-16">
          <div className="w-full max-w-2xl">
            <div className="bg-white rounded-3xl shadow-elevated overflow-hidden p-4 backdrop-blur-sm bg-white/90">
              <Carousel
                interval={3000}
                pause="hover"
                className="rounded-2xl overflow-hidden"
                style={{ display: "block" }}
              >
                {perros.map((perro) => (
                  <Carousel.Item
                    key={perro.id}
                    className="rounded-2xl overflow-hidden"
                    style={{ display: "block", padding: "0" }}
                  >
                    <div
                      className="relative bg-gradient-warm h-96 sm:h-96 md:h-96 flex items-center justify-center rounded-2xl"
                      style={{
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0",
                      }}
                    >
                      <img
                        className="d-block"
                        src={perro.ruta}
                        alt={`Perro ${perro.id}`}
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                          borderRadius: "16px",
                        }}
                      />
                      {/* Overlay gradiente */}
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"
                        style={{
                          pointerEvents: "none",
                        }}
                      ></div>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>

            {/* Indicador de progreso */}
            <div className="flex justify-center gap-2 mt-6">
              {perros.map((_, idx) => (
                <div
                  key={idx}
                  className="h-1.5 bg-beige-200 rounded-full transition-all duration-300"
                  style={{
                    width: idx === 0 ? "24px" : "8px",
                    backgroundColor: idx === 0 ? "#f5a025" : "#e0c8a8",
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Tarjetas de características */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "🏥",
              title: "Cuidado Profesional",
              description:
                "Personal capacitado en veterinaria y comportamiento animal",
            },
            {
              icon: "🎨",
              title: "Grooming Premium",
              description: "Servicios de belleza y cuidado especializados",
            },
            {
              icon: "❤️",
              title: "Amor y Dedicación",
              description: "Cada mascota recibe atención personalizada",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-beige-700 mb-2">
                {feature.title}
              </h3>
              <p className="text-warm-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
