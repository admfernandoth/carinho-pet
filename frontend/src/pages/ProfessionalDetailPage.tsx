import Navbar from '../components/Navbar';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export default function ProfessionalDetailPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['professional', id],
    queryFn: async () => {
      const res = await api.get(`/professionals/${id}`);
      return res.data as {
        id: string;
        name: string;
        role: string;
        rating: number;
        location: string;
        photos: string[];
        about: string;
      };
    },
    enabled: !!id,
  });

  return (
    <>
      <Navbar />
      <main className="py-5">
        <div className="container">
          {isLoading && <p className="text-center">Carregando perfil...</p>}
          {error && <p className="text-center text-danger">Erro ao carregar perfil.</p>}
          {data && (
            <div className="row">
              <div className="col-md-4 text-center">
                <img src={data.photos?.[0]} className="img-fluid rounded-circle mb-3" alt={data.name} />
                <h2>{data.name}</h2>
                <h5 className="text-muted">{data.role}</h5>
                <div className="rating mb-2">{'★'.repeat(Math.round(data.rating))}</div>
                <p>{data.location}</p>
                <Link to="/profissionais" className="btn btn-outline-secondary mt-3">Voltar à lista</Link>
              </div>
              <div className="col-md-8">
                <div id={`carousel-${data.id}`} className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img src={data.photos?.[0]} className="d-block w-100" alt="Foto 1" />
                    </div>
                    {data.photos?.[1] && (
                      <div className="carousel-item">
                        <img src={data.photos[1]} className="d-block w-100" alt="Foto 2" />
                      </div>
                    )}
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${data.id}`} data-bs-slide="prev"><span className="carousel-control-prev-icon"></span></button>
                  <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${data.id}`} data-bs-slide="next"><span className="carousel-control-next-icon"></span></button>
                </div>

                <div className="card mt-4">
                  <div className="card-body">
                    <h5 className="card-title">Sobre o Profissional</h5>
                    <p className="card-text">{data.about}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
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