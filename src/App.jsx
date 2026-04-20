import "./App.css";
import ListaPerros from "./components/ListaPerros.jsx";
import Home from "./pages/Home";
import Formulario from "./components/Formulario.jsx";
import CalculoEstadia from "./components/CalculoEstadia.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/NavBar.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthProvider>
        <Router>
          <Navbar />
          <main className="flex-1 pt-24 pb-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vertodos/estadia" element={<CalculoEstadia />} />
              <Route path="/edit" element={<Formulario />} />
              <Route path="/vertodos" element={<ListaPerros />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
