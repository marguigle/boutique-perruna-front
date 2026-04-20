import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Huéspedes", path: "/vertodos" },
    { name: "Estancia", path: "/vertodos/estadia" },
    { name: "Editar", path: "/edit" },
    { name: "Conectar", path: "/login" },
  ];

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-gradien-warm shadow-elevated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 no-underline group"
            onClick={() => setMenuOpen(false)}
          >
            <div className="w-12 h-12 bg-amber-300 rounded-full flex items-center justify-center shadow-soft group-hover:shadow-warm transition-shadow duration-300">
              <span className="text-2xl">🐕</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <h1 className="text-white font-bold text-xl leading-none drop-shadow-lg">
                Perruna
              </h1>
              <p className="text-white text-xs font-semibold drop-shadow-lg">
                Boutique
              </p>
            </div>
          </Link>

          {/* Botón hamburguesa para móvil */}
          <button
            className="lg:hidden text-black hover:text-yellow-600 transition-colors duration-300 p-2 drop-shadow-md"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Menú de navegación */}
          <div
            className={`absolute lg:static top-20 left-0 w-full lg:w-auto bg-gradient-warm lg:bg-transparent transition-all duration-300 ease-in-out lg:flex lg:items-center lg:space-x-1 ${
              menuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col lg:flex-row lg:space-x-1 py-4 lg:py-0 list-none p-4 lg:p-0">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="block px-4 py-2 text-orange font-bold rounded-lg transition-all duration-300 hover:bg-white/20 hover:text-yellow-50 no-underline group drop-shadow-md"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                    <span className="block h-0.5 bg-white/0 group-hover:bg-white/100 transition-all duration-300 scale-x-0 group-hover:scale-x-100"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
