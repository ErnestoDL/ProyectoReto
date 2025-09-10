import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Recover from "./pages/Recover.jsx";
import Index from "./pages/Index.jsx";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./styles/Login.css";

function Layout({ children }) {
  const location = useLocation();
  // No mostrar NavBar/Footer en login
  const hideNavAndFooter = location.pathname === "/";
  return (
    <>
      {!hideNavAndFooter && <NavBar />}
      {children}
      {!hideNavAndFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/recover" element={<Recover />} />
          <Route path="/index" element={<Index />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;