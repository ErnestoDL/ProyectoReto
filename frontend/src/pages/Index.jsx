import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Index() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); 
      return;
    }

    (async () => {
      const res = await fetch("http://localhost:4000/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        localStorage.removeItem("token");
        navigate("/");
        return;
      }
      const data = await res.json();
      setUser(data.user);
    })();
  }, [navigate]);

  if (!user) return <div style={{padding:20}}>Cargando...</div>;

  return (
    <>
      <main className="index-main">
        <h1 className="index-title">
          Bienvenido, {user.nombre} {user.apellido_p}
        </h1>
        <p className="index-puesto">
          Puesto: <span className="index-puesto-rol">{user.puesto}</span>
        </p>
        <h2 className="index-h2">
          Recuerda lo que aprendiste <span className="index-jugando">jugando</span>
        </h2>
        <p className="index-descripcion">
          Recuerda todo los pasos a seguir que lograste aprender y maximizar al estar jugando. Recuerda bien los pasos para lograr una perfecta subida de archivos antes de ser mandados
        </p>
      </main>
    </>
  );
}