import Navbar from '../components/Navbar';

export default function SignupPage() {
  return (
    <>
      <Navbar />
      <main className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Entrar como Tutor</h5>
                  <p className="text-muted">Use Google ou e-mail e senha.</p>
                  <button className="btn btn-outline-danger w-100 mb-2">Continuar com Google</button>
                  <div className="mb-3">
                    <label className="form-label">E-mail</label>
                    <input type="email" className="form-control" placeholder="seu@email.com" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Senha</label>
                    <input type="password" className="form-control" placeholder="••••••••" />
                  </div>
                  <button className="btn btn-primary w-100">Entrar</button>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Cadastrar como Cuidador/Adestrador</h5>
                  <p className="text-muted">Preencha seus dados e envie documentos para verificação.</p>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Nome Completo</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Telefone</label>
                        <input type="tel" className="form-control" />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Cidade/Bairro</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Especialidade</label>
                        <select className="form-select">
                          <option>Cuidador</option>
                          <option>Adestrador</option>
                          <option>Cat Sitter</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Documento (RG/CPF)</label>
                    <input type="file" className="form-control" />
                    <div className="form-text">Somente imagens (JPG/PNG) ou PDF.</div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Onde você cuida?</label>
                    <select className="form-select">
                      <option>Na minha casa</option>
                      <option>Na casa do tutor</option>
                      <option>Ambos</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Fotos do ambiente</label>
                    <input type="file" className="form-control" multiple />
                    <div className="form-text">Adicione ao menos 2 fotos (interno e externo).</div>
                  </div>

                  <button className="btn btn-success w-100">Enviar Cadastro</button>
                </div>
              </div>
            </div>
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