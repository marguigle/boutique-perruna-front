import "./App.css";
import ListaPerros from "./components/ListaPerros.jsx";
import Home from "./pages/Home";
import Formulario from "./components/Formulario.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/NavBar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importa tu Navbar
function App() {
  return (
    <div
      style={{
        background: "#e2e2e2",
        // backgroundImage: "url(90f53c87-723c-4260-8947-18096f970651.jpg)",
        // backgroundPosition: "center",
        // backgroundSize: "cover" /* Ajusta la imagen para cubrir todo el div */,
        // backgroundRepeat: "no-repeat" /* Evita que la imagen se repita */,
      }}
    >
      <Router>
        <Header />
        <Navbar /> {/* Barra de navegación visible en todas las páginas */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
          <Route path="/edit" element={<Formulario />} />
          <Route path="/vertodos" element={<ListaPerros />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
