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
    <div className="container bg-emerald-300">
      <div
        style={{
          width: "50vw",
          height: "500px",
          margin: "0 auto",
          overflow: "hidden",
        }}
      >
        <div className="row">
          <div className="col-4"></div>
          <div>
            <Carousel>
              {perros.map((perro) => (
                <Carousel.Item key={perro.id} interval={2000}>
                  <img
                    className="d-block"
                    src={perro.ruta}
                    alt={`Perro ${perro.id}`}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain", // 👈 Esta línea es la clave
                      margin: "0 auto",
                    }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div className="col-4"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
