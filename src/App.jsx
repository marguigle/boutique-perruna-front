import "./App.css";
import ListaPerros from "./components/ListaPerros.jsx";
import Home from "./pages/Home";
import Formulario from "./components/Formulario.jsx";
import CalculoEstadia from "./components/CalculoEstadia.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/NavBar.jsx";
import Register from "./pages/Register.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importa tu Navbar
function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Navbar />
          <div style={{ padding: "80px 80px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vertodos/estadia" element={<CalculoEstadia />} />
              {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
              <Route path="/edit" element={<Formulario />} />
              <Route path="/vertodos" element={<ListaPerros />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="/login" element="login" />
            <Route path="/profile" element="profile" /> */}
            </Routes>
          </div>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
