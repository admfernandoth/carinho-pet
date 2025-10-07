import Navbar from '../components/Navbar';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <section id="hero" className="text-center text-white d-flex align-items-center">
        <div className="container">
          <h1 className="display-4">Tranquilidade para você, carinho e diversão para seu pet.</h1>
          <p className="lead">Encontre cuidadores e adestradores verificados e avaliados pela comunidade em Três Lagoas.</p>
          <a href="/profissionais" className="btn btn-primary btn-lg mt-3">Ver Profissionais Disponíveis</a>
        </div>
      </section>

      <section id="demo" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Cuidadores e Adestradores em Destaque</h2>
          <div className="row">
            {[
              {
                img: '/imagens/ana-cuidadora.jpg',
                name: 'Ana Beatriz S.',
                subtitle: 'Cuidadora de Cães e Gatos',
                rating: '★★★★★ (32 avaliações)',
                text: '"Ana foi incrível com o Max! Ele é super ansioso e ela teve toda a paciência do mundo. Recebi fotos e vídeos todos os dias. Recomendo demais!"',
              },
              {
                img: '/imagens/bruno-adestrador.jpg',
                name: 'Bruno Oliveira',
                subtitle: 'Adestrador Profissional',
                rating: '★★★★★ (18 avaliações)',
                text: '"O Bruno transformou nosso filhote! Em poucas aulas, a Belinha já aprendeu os comandos básicos e está muito mais obediente. Profissional nota 10."',
              },
              {
                img: '/imagens/carla-catsitter.jpg',
                name: 'Carla Mendes',
                subtitle: 'Especialista em Gatos (Cat Sitter)',
                rating: '★★★★★ (27 avaliações)',
                text: '"Deixei meus dois gatos com a Carla e foi a melhor decisão. Ela entende muito de felinos, respeitou o espaço deles e me manteve super informada."',
              },
            ].map((p) => (
              <div className="col-lg-4 col-md-6 mb-4" key={p.name}>
                <div className="card profile-card h-100">
                  <img src={p.img} className="card-img-top" alt={`Foto de ${p.name}`} />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{p.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{p.subtitle}</h6>
                    <div className="rating mb-2">{p.rating}</div>
                    <p className="card-text">{p.text}</p>
                    <a href="/profissionais" className="btn btn-outline-primary mt-auto">Ver Perfil Completo</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <a href="/profissionais" className="btn btn-success btn-lg">Quero Encontrar o Cuidador Ideal</a>
          </div>
        </div>
      </section>

      <section id="quem-somos" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Nossa Missão no Carinho Pet</h2>
          <p className="text-center lead">No Carinho Pet, nascemos da necessidade de encontrar um lugar seguro e confiável para o cuidado e adestramento de pets em Três Lagoas. Nossa plataforma conecta pessoas, promove a confiança por meio de um sistema rigoroso de verificação e avaliações mútuas, e garante o bem-estar dos animais, que são nossa paixão.</p>
          <div className="text-center mt-4">
            <img src="/imagens/quem_somos.png" alt="Pets Felizes" className="img-fluid rounded" style={{ maxHeight: 300, objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      <footer className="py-4 bg-dark text-white">
        <div className="container text-center">
          <p>&copy; 2025 Carinho Pet. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}