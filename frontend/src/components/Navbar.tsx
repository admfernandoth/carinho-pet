import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="https://via.placeholder.com/160x80?text=Logo" alt="Logo Carinho Pet" style={{ height: 80 }} /> Carinho Pet
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Início</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profissionais">Encontrar Profissionais</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#quem-somos">Quem Somos</a>
            </li>
            <li className="nav-item">
              <Link className="btn btn-outline-primary ms-2" to="/cadastro">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-success ms-2" to="/cadastro">Cadastre-se Grátis</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}