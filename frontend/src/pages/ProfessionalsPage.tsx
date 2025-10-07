import Navbar from '../components/Navbar';
import { useProfessionals } from '../hooks/useProfessionals';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProfessionalsPage() {
  const [input, setInput] = useState('');
  const [q, setQ] = useState<string | undefined>(undefined);
  const { data, isLoading, error } = useProfessionals(q);

  return (
    <>
      <Navbar />
      <main className="py-5">
        <div className="container">
          <h1 className="text-center mb-4">Encontre o Profissional Ideal</h1>
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por nome ou serviço..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button className="btn btn-primary" type="button" onClick={() => setQ(input || undefined)}>Buscar</button>
              </div>
              <div className="text-center">
                <div className="btn-group" role="group">
                  <button type="button" className="btn btn-outline-secondary active" onClick={() => setQ(undefined)}>Todos</button>
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setQ('Cuidadora')}>Cuidadores</button>
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setQ('Adestrador')}>Adestradores</button>
                </div>
              </div>
              {isLoading && <p className="mt-3 text-center">Carregando profissionais...</p>}
              {error && <p className="mt-3 text-center text-danger">Falha ao carregar profissionais.</p>}
            </div>
          </div>

          <div className="row">
            {(data || []).map((p) => (
              <div className="col-lg-12 mb-4" key={p.id}>
                <div className="card professional-card-large">
                  <div className="row g-0">
                    <div className="col-md-3 text-center p-3 d-flex flex-column">
                      <img src={p.photos?.[0]} className="img-fluid rounded-circle mb-3 mx-auto" alt={p.name} />
                      <h5 className="card-title">{p.name}</h5>
                      <h6 className="text-muted">{p.role}</h6>
                      <div className="rating">{'★'.repeat(Math.round(p.rating))}</div>
                      <div className="mt-3">
                        <p className="mb-1">{p.location}</p>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div id={`carousel-${p.id}`} className="carousel slide h-100" data-bs-ride="carousel">
                        <div className="carousel-inner h-100">
                          <div className="carousel-item active h-100">
                            <img src={p.photos?.[0]} className="d-block w-100 carousel-img" alt="Foto 1" />
                          </div>
                          {p.photos?.[1] && (
                            <div className="carousel-item h-100">
                              <img src={p.photos[1]} className="d-block w-100 carousel-img" alt="Foto 2" />
                            </div>
                          )}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${p.id}`} data-bs-slide="prev"><span className="carousel-control-prev-icon"></span></button>
                        <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${p.id}`} data-bs-slide="next"><span className="carousel-control-next-icon"></span></button>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card-body">
                        <h5 className="card-title">Sobre o Local</h5>
                        <p className="card-text">{p.about}</p>
                        <div className="review-highlight">
                          <strong>Última Avaliação:</strong>
                          <p className="mb-0">{p.review}</p>
                        </div>
                        <Link to={`/profissionais/${p.id}`} className="btn btn-primary mt-3 w-100">Ver Perfil e Agendar</Link>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="py-4 bg-dark text-white">
        <div className="container text-center">
          <p>&copy; 2025 Carinho Pet. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}