import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-beige-700 to-orange-600 text-white mt-20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid de contenido */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Sección de información */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-4xl">🐕</span>
              <div>
                <h3 className="font-bold text-xl leading-none">Perruna</h3>
                <p className="text-sm text-orange-100">Boutique</p>
              </div>
            </div>
            <p className="text-white text-sm text-center md:text-left">
              Cuidado y hospedaje de mascotas con amor y dedicación.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="flex flex-col items-center">
            <h4 className="font-bold text-lg mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <Link
                  to="/"
                  className="text-orange-100 hover:text-white transition-colors duration-300 no-underline"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/vertodos"
                  className="text-orange-100 hover:text-white transition-colors duration-300 no-underline"
                >
                  Huéspedes
                </Link>
              </li>
              <li>
                <Link
                  to="/vertodos/estadia"
                  className="text-orange-100 hover:text-white transition-colors duration-300 no-underline"
                >
                  Calcular Estancia
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="font-bold text-lg mb-4">Contacto</h4>
            <p className="text-white text-sm mb-2">📱 +54 9 XXXX-XXXX</p>
            <p className="text-white text-sm mb-4">
              📧 info@perrunaboutique.com
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 no-underline"
              >
                f
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 no-underline"
              >
                ig
              </a>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white text-sm">
            © {currentYear} Perruna Boutique. Todos los derechos reservados.
          </p>
          <p className="text-white text-xs mt-2">
            Diseñado con 💛 para tus mascotas
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
