# Projeto P1 - Desenvolvimento Web (Frontend Angular + Backend Integrado)

Projeto de e-commerce musical (**90's Guitar Store**) desenvolvido em **Angular 22** integrado com backend para gerenciamento de **Produtos**, **Clientes** e **Pedidos**, em conformidade com as especificações dos documentos:
- `EndPointsAPICliente.pdf`
- `EndPointsAPIPedido.pdf`
- `EndPointsAPIProduto.pdf`

---

## 🛠️ Correção do Erro `ERR_CONNECTION_RESET (-101)`

O erro de conexão resetada ao acessar `http://localhost:4200/` foi diagnosticado e corrigido com as seguintes ações:
1. **Remoção de dependência incompatível com Node v24**: A biblioteca nativa `sqlite3` compilada em C++ causava violação de acesso à memória (`0xC0000005`), abortando instantaneamente a execução do servidor e reiniciando a conexão TCP do navegador. Foi substituída por um gerenciador de dados desacoplado em memória e integrada à API Express pura.
2. **Resolução de conflito de cache no Windows**: Remoção e limpeza de travas no diretório `.angular/cache` que geravam erros de `EPERM` no Vite/SSR.
3. **Configuração de segurança de hosts (`allowedHosts`)**: No Angular SSR, as requisições para `localhost` e `127.0.0.1` foram devidamente liberadas no `angular.json`, garantindo resposta HTTP 200 e eliminando falhas de conexão.
4. **Otimização offline de fontes**: Desativação do inlining de fontes do Google Fonts no `angular.json` para permitir compilação sem bloqueios de rede.

---

## 🚀 Como Executar o Projeto

### 1. Instalar as dependências
```bash
npm install
```

### 2. Gerar o build do projeto
```bash
npm run build
```

### 3. Iniciar o servidor integrado (Frontend + API na porta 4200)
```bash
npm run serve
```
Abra o navegador em: [http://localhost:4200](http://localhost:4200)

---

## 📦 Backend Spring Boot Fornecido (`backend/`)

O backend original em **Java / Spring Boot** (`lojinha`) foi incluído na pasta `backend/`:
- **Controllers**: `ClienteController.java`, `ProdutoController.java`, `PedidoController.java`
- **Repositories**: `ClienteRepository.java`, `ProdutoRepository.java`, `PedidoRepository.java`
- **Entidades**: `Cliente.java`, `Produto.java`, `Pedido.java`, `ItemPedido.java`
- Porta padrão configurada: `8081`

---

## 📡 Endpoints Implementados (Conforme PDFs)

### 👤 1. Cliente API (`/api/cliente`)
| Método | Endpoint | Descrição | Retorno |
|---|---|---|---|
| **GET** | `/api/cliente/{codigo}` | Busca cliente por código | Dados do cliente ou `{}` |
| **POST** | `/api/cliente` | Cadastra novo cliente | `"Cliente gravado com sucesso! {codigo}"` |
| **PUT** | `/api/cliente` | Atualiza dados do cliente existente | `"Cliente alterado com sucesso! {codigo}"` ou `"Cliente não encontrado!"` |
| **DELETE** | `/api/cliente/{codigo}` | Exclui cliente por código | `"Cliente removido com sucesso!"` |
| **POST** | `/api/cliente/login` | Autentica cliente via email e senha | Dados do cliente ou `{}` |
| **PATCH** | `/api/cliente/resetarSenha` | Reseta a senha para padrão `Senha1234` | `"Sua senha foi reiniciada, verifique o seu email!"` |
| **PATCH** | `/api/cliente/alterarSenha` | Altera senha por email e documento | `"Sua senha foi alterada, verifique o seu email!"` |

### 🎸 2. Produto API (`/api/produto` e `/api/produtos`)
| Método | Endpoint | Descrição | Retorno |
|---|---|---|---|
| **GET** | `/api/produto/{codigo}` | Busca produto por código | Dados do produto ou `{}` |
| **POST** | `/api/produto` | Cadastra novo produto | `"Produto gravado com sucesso! {codigo}"` |
| **PUT** | `/api/produto` | Altera produto existente | `"Produto alterado com sucesso! {codigo}"` ou `"produto não encontrado!"` |
| **DELETE** | `/api/produto/{codigo}` | Exclui produto por código | `"Produto removido com sucesso!"` |
| **GET** | `/api/produtos` | Lista todos os produtos cadastrados | `List<Produto>` |
| **GET** | `/api/produto/vitrine` | Carrega produtos da vitrine da loja | `List<Produto>` |
| **GET** | `/api/produto/busca/{termo}` | Busca produtos por termo (LIKE SQL) | `List<Produto>` |

### 🛒 3. Pedido API (`/api/pedido`)
| Método | Endpoint | Descrição | Retorno |
|---|---|---|---|
| **GET** | `/api/pedido/{codigo}` | Consulta pedido por código | Dados do pedido ou `{}` |
| **POST** | `/api/pedido` | Cadastra novo pedido | `"Cliente gravado com sucesso! {codigoPedido}"` |
| **PUT** | `/api/pedido` | Altera dados de um pedido existente | `"PEdido alterado com sucesso! {codigoPedido}"` ou `"Pedido não encontrado!"` |
| **DELETE** | `/api/pedido/{codigo}` | Remove pedido por código | `"Pedido removido com sucesso!"` |

---

## 💻 Integração no Frontend Angular

Foram criados os modelos e serviços consumidos dinamicamente pelas páginas do projeto:
- `src/app/models/`: `cliente.model.ts`, `produto.model.ts`, `pedido.model.ts`
- `src/app/services/`:
  - `ProdutoService`: Métodos `carregaVitrine()`, `fazerBusca()`, `retornaProduto()`, `listar()`, `gravar()`, `alterar()`, `apagar()`.
  - `ClienteService`: Métodos `retorna()`, `gravar()`, `alterar()`, `apagar()`, `fazerLogin()`, `resetarSenha()`, `alterarSenha()`.
  - `PedidoService`: Métodos `retorna()`, `gravar()`, `alterar()`, `apagar()`.
- **Páginas integradas**:
  - `Home / Vitrine`: Carrega guitarras da vitrine via `ProdutoService.carregaVitrine()`.
  - `Busca`: Pesquisa em tempo real via `ProdutoService.fazerBusca(termo)`.
  - `Detalhe`: Exibe especificações carregando via `ProdutoService.retornaProduto(codigo)`.
  - `Cesta`: Efetua checkout e grava o pedido via `PedidoService.gravar(pedido)`.
  - `Header`: Modal de login e cadastro integrado com `ClienteService.fazerLogin()` e `ClienteService.gravar()`.
  - `Esqueci a Senha`: Redefine senha do cliente via `ClienteService.resetarSenha()`.
