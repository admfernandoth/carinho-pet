import http from 'node:http';
import { parse, fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const mockCaregivers = [
  {
    id: 'mock-ana',
    name: 'Ana Beatriz S.',
    role: 'Cuidadora de Cães e Gatos',
    rating: 5,
    location: 'Lapa',
    photos: ['/imagens/ana-local-interno.jpg', '/imagens/ana-local-externo.jpg'],
    about:
      'Ofereço um ambiente familiar e seguro na minha casa. Tenho um quintal grande e totalmente cercado para os cães brincarem e uma sala de estar aconchegante.',
    review: 'Ana foi incrível com o Max! Recomendo demais!'
  },
  {
    id: 'mock-bruno',
    name: 'Bruno Oliveira',
    role: 'Adestrador Profissional',
    rating: 5,
    location: 'Centro',
    photos: ['/imagens/bruno-local-treino.jpg', '/imagens/bruno-local-interno.jpg'],
    about:
      'Utilizo reforço positivo para ensinar comandos e melhorar o comportamento do seu cão. Aulas na minha área de treino equipada ou na casa do tutor.',
    review: 'Transformou nosso filhote! Profissional nota 10.'
  },
  {
    id: 'mock-carla',
    name: 'Carla Mendes',
    role: 'Especialista em Gatos',
    rating: 5,
    location: 'Jardim Alvorada',
    photos: ['/imagens/carla-local-gatos-1.jpg', '/imagens/carla-local-gatos-2.jpg'],
    about:
      'Casa 100% gatificada, com arranhadores, prateleiras e brinquedos. Ambiente calmo e estimulante, livre de cães.',
    review: 'Meus gatos amaram, serviço impecável.'
  },
];

function json(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  });
  res.end(JSON.stringify(data));
}

// Helpers de estáticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticBase = path.resolve(__dirname, '..', '..');
function sendFile(res, filePath, contentType = 'text/html') {
  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    });
    res.end(data);
  } catch (e) {
    res.writeHead(404, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
}

const server = http.createServer(async (req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    });
    res.end();
    return;
  }

  const { pathname, query } = parse(req.url || '', true);

  // Rotas estáticas
  // Home
  if ((pathname === '/' || pathname === '/index' || pathname === '/index.html') && req.method === 'GET') {
    const filePath = path.join(staticBase, 'index.html');
    return sendFile(res, filePath, 'text/html');
  }
  // Profissionais
  if ((pathname === '/profissionais' || pathname === '/profissionais.html') && req.method === 'GET') {
    const filePath = path.join(staticBase, 'profissionais.html');
    return sendFile(res, filePath, 'text/html');
  }
  // Cadastro
  if ((pathname === '/cadastro' || pathname === '/cadastro.html') && req.method === 'GET') {
    const filePath = path.join(staticBase, 'cadastro.html');
    return sendFile(res, filePath, 'text/html');
  }
  // Comunidade
  if ((pathname === '/comunidade' || pathname === '/comunidade.html') && req.method === 'GET') {
    const filePath = path.join(staticBase, 'comunidade.html');
    return sendFile(res, filePath, 'text/html');
  }
  // Fidelidade
  if ((pathname === '/fidelidade' || pathname === '/fidelidade.html') && req.method === 'GET') {
    const filePath = path.join(staticBase, 'fidelidade.html');
    return sendFile(res, filePath, 'text/html');
  }
  if (pathname === '/style.css' && req.method === 'GET') {
    const filePath = path.join(staticBase, 'style.css');
    return sendFile(res, filePath, 'text/css');
  }
  if (pathname && pathname.toLowerCase().startsWith('/imagens/') && req.method === 'GET') {
    const relative = pathname.replace(/^\/+/, '');
    let filePath = path.join(staticBase, relative);

    // Fallback: se o caminho em minúsculo não existir, tenta a pasta 'Imagens' (maiúsculo)
    if (!fs.existsSync(filePath)) {
      const altRelative = relative.replace(/^imagens\//, 'Imagens/');
      const altPath = path.join(staticBase, altRelative);
      if (fs.existsSync(altPath)) {
        filePath = altPath;
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = ext === '.svg' ? 'image/svg+xml' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : ext === '.png' ? 'image/png' : 'application/octet-stream';
    return sendFile(res, filePath, type);
  }

  if (pathname === '/health') {
    return json(res, 200, { status: 'ok' });
  }

  // versão do serviço (para validar redeploys)
  if (pathname === '/version') {
    try {
      const pkgPath = path.join(staticBase, 'package.json');
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      return json(res, 200, { name: pkg.name, version: pkg.version });
    } catch (e) {
      return json(res, 200, { version: 'unknown' });
    }
  }

  if (pathname === '/professionals' && req.method === 'GET') {
    const q = (query?.q || '').toString().toLowerCase();
    const list = mockCaregivers.filter((c) => {
      if (!q) return true;
      return (
        c.role.toLowerCase().includes(q) ||
        c.about.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q)
      );
    });
    return json(res, 200, list);
  }

  if (pathname?.startsWith('/professionals/') && req.method === 'GET') {
    const id = pathname.split('/').pop();
    const found = mockCaregivers.find((c) => c.id === id);
    if (!found) return json(res, 404, { error: 'Not found' });
    return json(res, 200, found);
  }

  if (pathname === '/bookings' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        // apenas gera um id simples para MVP
        const id = 'booking-' + Date.now();
        return json(res, 201, { id });
      } catch (e) {
        return json(res, 400, { error: 'Invalid JSON' });
      }
    });
    return;
  }

  return json(res, 404, { error: 'Not found' });
});

const PORT = parseInt(process.env.PORT || '3002', 10);
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API running on http://localhost:${PORT}`);
});