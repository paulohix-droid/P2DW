import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import {
  produtosDB,
  clientesDB,
  pedidosDB,
  Produto,
  Cliente,
  Pedido
} from './database';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Middlewares para parsing de JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Habilita CORS liberado para qualquer origem conforme documentação (@CrossOrigin(origins = "*"))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  next();
});

// ==========================================
// 1. ENDPOINTS DA API DE CLIENTE (ClienteController.java)
// Base URL: /api/cliente
// ==========================================

// 1. Buscar Cliente por Código
app.get('/api/cliente/:codigo', (req, res) => {
  const codigo = parseInt(req.params.codigo, 10);
  const cliente = clientesDB.find((c) => c.codigo === codigo);
  if (cliente) {
    res.json(cliente);
  } else {
    res.json({});
  }
});

// 2. Cadastrar Cliente
app.post('/api/cliente', (req, res) => {
  const dados = req.body;
  const novoCodigo = clientesDB.length > 0 ? Math.max(...clientesDB.map((c) => c.codigo)) + 1 : 1;
  const novoCliente: Cliente = {
    codigo: novoCodigo,
    nome: dados.nome || '',
    email: dados.email || '',
    telefone: dados.telefone || '',
    documento: dados.documento || '',
    senha: dados.senha || '',
    logradouro: dados.logradouro || '',
    ativo: dados.ativo !== undefined ? dados.ativo : 1,
  };
  clientesDB.push(novoCliente);
  res.send(`Cliente gravado com sucesso! ${novoCodigo}`);
});

// 3. Alterar Cliente
app.put('/api/cliente', (req, res) => {
  const dados = req.body;
  const index = clientesDB.findIndex((c) => c.codigo === Number(dados.codigo));
  if (index !== -1) {
    clientesDB[index] = {
      ...clientesDB[index],
      ...dados,
      codigo: clientesDB[index].codigo
    };
    res.send(`Cliente alterado com sucesso! ${dados.codigo}`);
  } else {
    res.send('Cliente não encontrado!');
  }
});

// 4. Excluir Cliente
app.delete('/api/cliente/:codigo', (req, res) => {
  const codigo = parseInt(req.params.codigo, 10);
  const index = clientesDB.findIndex((c) => c.codigo === codigo);
  if (index !== -1) {
    clientesDB.splice(index, 1);
  }
  res.send('Cliente removido com sucesso!');
});

// 5. Login do Cliente
app.post('/api/cliente/login', (req, res) => {
  const { email, senha } = req.body;
  const cliente = clientesDB.find((c) => c.email === email && c.senha === senha && c.ativo !== 0);
  if (cliente) {
    res.json(cliente);
  } else {
    res.json({});
  }
});

// 6. Resetar Senha
app.patch('/api/cliente/resetarSenha', (req, res) => {
  const { email } = req.body;
  const cliente = clientesDB.find((c) => c.email === email);
  if (cliente) {
    cliente.senha = 'Senha1234';
    cliente.ativo = 0;
  }
  res.send('Sua senha foi reiniciada, verifique o seu email!');
});

// 7. Alterar Senha
app.patch('/api/cliente/alterarSenha', (req, res) => {
  const { email, documento, senha } = req.body;
  const cliente = clientesDB.find((c) => c.email === email && (!documento || c.documento === documento));
  if (cliente) {
    cliente.senha = senha;
    cliente.ativo = 1;
  }
  res.send('Sua senha foi alterada, verifique o seu email!');
});

// ==========================================
// 2. ENDPOINTS DA API DE PRODUTO (ProdutoController.java)
// Base URL: /api/produto
// ==========================================

// 5. Listar Todos os Produtos (/api/produtos)
app.get('/api/produtos', (_req, res) => {
  res.json(produtosDB);
});

// 6. Carregar Produtos da Vitrine (/api/produto/vitrine)
app.get('/api/produto/vitrine', (_req, res) => {
  const vitrine = produtosDB.filter((p) => (p.destaque && p.destaque > 0) || p.codigo <= 4);
  res.json(vitrine);
});

// 7. Buscar Produtos por Descrição (/api/produto/busca/{termo})
app.get('/api/produto/busca/:termo', (req, res) => {
  const termo = req.params.termo.toLowerCase();
  const filtrados = produtosDB.filter(
    (p) =>
      p.nome.toLowerCase().includes(termo) ||
      p.descricao.toLowerCase().includes(termo) ||
      (p.descritivo && p.descritivo.toLowerCase().includes(termo)) ||
      (p.marca && p.marca.toLowerCase().includes(termo))
  );
  res.json(filtrados);
});

// 1. Buscar Produto por Código (/api/produto/{codigo})
app.get('/api/produto/:codigo', (req, res) => {
  const codigo = parseInt(req.params.codigo, 10);
  const produto = produtosDB.find((p) => p.codigo === codigo);
  if (produto) {
    res.json(produto);
  } else {
    res.json({});
  }
});

// 2. Cadastrar Produto (/api/produto)
app.post('/api/produto', (req, res) => {
  const dados = req.body;
  const novoCodigo = produtosDB.length > 0 ? Math.max(...produtosDB.map((p) => p.codigo)) + 1 : 1;
  const novoProduto: Produto = {
    codigo: novoCodigo,
    nome: dados.nome || dados.descricao || `Produto ${novoCodigo}`,
    descricao: dados.descricao || dados.descritivo || dados.nome || '',
    descritivo: dados.descritivo || dados.descricao || '',
    valor: Number(dados.valor) || 0,
    valorPromo: Number(dados.valorPromo) || 0,
    quantidade: Number(dados.quantidade) || 0,
    destaque: dados.destaque !== undefined ? Number(dados.destaque) : 1,
    imagem: dados.imagem || '/logo.png',
    marca: dados.marca || 'Geral'
  };
  produtosDB.push(novoProduto);
  res.send(`Produto gravado com sucesso! ${novoCodigo}`);
});

// 3. Alterar Produto (/api/produto)
app.put('/api/produto', (req, res) => {
  const dados = req.body;
  const index = produtosDB.findIndex((p) => p.codigo === Number(dados.codigo));
  if (index !== -1) {
    produtosDB[index] = {
      ...produtosDB[index],
      ...dados,
      codigo: produtosDB[index].codigo
    };
    res.send(`Produto alterado com sucesso! ${dados.codigo}`);
  } else {
    res.send('produto não encontrado!');
  }
});

// 4. Excluir Produto (/api/produto/{codigo})
app.delete('/api/produto/:codigo', (req, res) => {
  const codigo = parseInt(req.params.codigo, 10);
  const index = produtosDB.findIndex((p) => p.codigo === codigo);
  if (index !== -1) {
    produtosDB.splice(index, 1);
  }
  res.send('Produto removido com sucesso!');
});

// ==========================================
// 3. ENDPOINTS DA API DE PEDIDO (PedidoController.java)
// Base URL: /api/pedido
// ==========================================

// 1. Buscar Pedido (/api/pedido/{codigo})
app.get('/api/pedido/:codigo', (req, res) => {
  const codigo = parseInt(req.params.codigo, 10);
  const pedido = pedidosDB.find((p) => p.codigoPedido === codigo);
  if (pedido) {
    res.json(pedido);
  } else {
    res.json({});
  }
});

// 2. Cadastrar Pedido (/api/pedido)
app.post('/api/pedido', (req, res) => {
  const dados = req.body;
  const novoCodigo = dados.codigoPedido || (pedidosDB.length > 0 ? Math.max(...pedidosDB.map((p) => p.codigoPedido)) + 1 : 1);
  const novoPedido: Pedido = {
    codigoPedido: novoCodigo,
    codigoCliente: dados.codigoCliente || 1,
    valorTotal: Number(dados.valorTotal) || 0,
    entrega: dados.entrega || 'Padrão',
    obs: dados.obs || '',
    dataPedido: dados.dataPedido || new Date().toISOString().slice(0, 10),
    itens: dados.itens || []
  };
  pedidosDB.push(novoPedido);
  res.send(`Cliente gravado com sucesso! ${novoCodigo}`);
});

// 3. Alterar Pedido (/api/pedido)
app.put('/api/pedido', (req, res) => {
  const dados = req.body;
  const index = pedidosDB.findIndex((p) => p.codigoPedido === Number(dados.codigoPedido));
  if (index !== -1) {
    pedidosDB[index] = {
      ...pedidosDB[index],
      ...dados,
      codigoPedido: pedidosDB[index].codigoPedido
    };
    res.send(`PEdido alterado com sucesso! ${dados.codigoPedido}`);
  } else {
    res.send('Pedido não encontrado!');
  }
});

// 4. Excluir Pedido (/api/pedido/{codigo})
app.delete('/api/pedido/:codigo', (req, res) => {
  const codigo = parseInt(req.params.codigo, 10);
  const index = pedidosDB.findIndex((p) => p.codigoPedido === codigo);
  if (index !== -1) {
    pedidosDB.splice(index, 1);
  }
  res.send('Pedido removido com sucesso!');
});

// ==========================================
// ANGULAR SSR E SERVIÇO DE ARQUIVOS ESTÁTICOS
// ==========================================

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch((_err) => {
      res.sendFile(join(browserDistFolder, 'index.html'));
    });
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4200;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
