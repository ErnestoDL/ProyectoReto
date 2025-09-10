import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logosantandercentro.png"; // Usa tu imagen de logo
import "../styles/NavBar.css";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-group">
        <Link to="/index">Inicio</Link>
        <Link to="/manual">Manual de uso</Link>
      </div>
      <div className="logo-center">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>
      <div className="nav-group">
        <Link to="/videojuego">Videojuego</Link>
        <button className="logout-btn" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}