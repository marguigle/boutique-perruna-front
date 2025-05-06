// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
//       <div className="container">
//         <Link className="navbar-brand" to="/">
//           <h1 style={{ color: "red" }}>Perruna Boutique</h1>
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">
//                 Inicio
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/about">
//                 Acerca
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/contact">
//                 Contacto
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/vertodos">
//                 Huespedes
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/edit">
//                 Editar
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Estado para manejar el menú en móviles
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-900 fixed w-full top-0 left-0 z-50 shadow-md ">
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="flex items-center justify-between">
          <Link className="text-red-600 text-4xl font-bold no-underline" to="/">
            Perruna Boutique
          </Link>

          {/* Botón hamburguesa */}
          <button
            className="lg:hidden text-white"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)} // Maneja el cambio del menú en móvil
            aria-label="Toggle menu"
          >
            <span className="navbar-toggler-icon ">☰</span>{" "}
            {/* Icono del menú */}
          </button>

          {/* Menú en pantallas grandes y móviles si está abierto */}
          <div
            className={`lg:flex items-center space-x-6 ${
              menuOpen ? "block" : "hidden"
            } lg:block`}
            id="navbarNav"
          >
            <ul className="flex space-x-6 text-white list-none">
              {" "}
              {/* Clase list-none para quitar los bullets */}
              <li>
                <Link
                  className="hover:text-blue-300 transition duration-300 px-3 py-2 rounded-md bg-transparent hover:bg-blue-800 no-underline"
                  to="/"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-300  transition duration-300 px-3 py-2 rounded-md bg-transparent hover:bg-blue-800 no-underline"
                  to="/about"
                >
                  Acerca
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-300  transition duration-300 px-3 py-2 rounded-md bg-transparent hover:bg-blue-800 no-underline"
                  to="/contact"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-300  transition duration-300 px-3 py-2 rounded-md bg-transparent hover:bg-blue-800 no-underline"
                  to="/vertodos"
                >
                  Huespedes
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-blue-300  transition duration-300 px-3 py-2 rounded-md bg-transparent hover:bg-blue-800 no-underline"
                  to="/edit"
                >
                  Editar
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
