export interface Produto {
  codigo: number;
  nome: string;
  descricao: string;
  descritivo?: string;
  valor: number;
  valorPromo?: number;
  quantidade?: number;
  destaque?: number;
  imagem?: string;
  detalhes?: string[];
  marca?: string;
}

export interface Cliente {
  codigo: number;
  nome: string;
  email: string;
  telefone?: string;
  documento?: string;
  senha?: string;
  logradouro?: string;
  ativo?: number;
}

export interface ItemPedido {
  codigoItemPedido?: number;
  codigoProduto: number;
  quantidade: number;
  valor: number;
}

export interface Pedido {
  codigoPedido: number;
  codigoCliente?: number;
  valorTotal?: number;
  entrega?: string;
  obs?: string;
  dataPedido?: string;
  itens?: ItemPedido[];
}

// Armazenamento em memória com dados padrão para vitrine, busca e detalhes
export const produtosDB: Produto[] = [
  {
    codigo: 1,
    nome: 'Gibson Sammy Hagar Explorer',
    descricao: 'Gibson Sammy Hagar Explorer - Vermelha',
    descritivo: 'Corpo em Mogno, braço SlimTaper, 2 captadores Humbucker',
    valor: 9800.00,
    valorPromo: 9200.00,
    quantidade: 5,
    destaque: 1,
    imagem: '/Gibson Sammy Hagar Explorer.jpg',
    marca: 'Gibson',
    detalhes: ['Corpo em Mogno', 'Braço perfil SlimTaper', '2 Captadores Humbucker', 'Cor autêntica Red Rocker']
  },
  {
    codigo: 2,
    nome: "Fender Stratocaster 'Black Strat'",
    descricao: "Fender Stratocaster 'Black Strat' - David Gilmour",
    descritivo: 'Corpo em Alder maciço, escala em Maple, captadores Custom',
    valor: 15000.00,
    valorPromo: 14500.00,
    quantidade: 3,
    destaque: 1,
    imagem: "/David Gilmour’s Guitar Collection sells for $21_5 million at Christie’s.jpg",
    marca: 'Fender',
    detalhes: ['Corpo em Alder maciço', 'Escala em Maple', 'Captadores Custom Single-Coil', 'Braço perfil "C" customizado']
  },
  {
    codigo: 3,
    nome: 'Fender Custom Telecaster Sunburst (2000)',
    descricao: 'Fender Custom Telecaster Sunburst (2000)',
    descritivo: 'Corpo em Ash, braço em Maple, ponte vintage',
    valor: 7500.00,
    valorPromo: 7200.00,
    quantidade: 8,
    destaque: 1,
    imagem: '/2000 Fender Custom Telecaster Sunburst.jpg',
    marca: 'Fender',
    detalhes: ['Corpo em Ash', 'Braço em Maple', 'Captadores Custom Shop', 'Ponte estilo Vintage']
  },
  {
    codigo: 4,
    nome: 'Fender CD-140SCE All Mahogany',
    descricao: 'Fender CD-140SCE All Mahogany',
    descritivo: 'Violão eletroacústico todo em mogno com preamp Fishman',
    valor: 6200.00,
    valorPromo: 5900.00,
    quantidade: 10,
    destaque: 1,
    imagem: '/Amazon_com_ Fender CD-140SCE Acoustic_Electric Guitar (All Mahogany), Natural_ Musical Instruments.jpg',
    marca: 'Acústicas',
    detalhes: ['Tampo maciço em Mogno', 'Fundo e ilhargas em Mogno', 'Pré-amplificador Fishman CD', 'Formato Dreadnought com Cutaway']
  }
];

export const clientesDB: Cliente[] = [
  {
    codigo: 1,
    nome: 'João Silva',
    email: 'joao@email.com',
    telefone: '11999998888',
    documento: '12345678900',
    senha: 'Senha1234',
    logradouro: 'Rua das Flores, 123',
    ativo: 1
  }
];

export const pedidosDB: Pedido[] = [
  {
    codigoPedido: 1,
    codigoCliente: 1,
    valorTotal: 9800.00,
    entrega: 'Expressa',
    obs: 'Entregar em horário comercial',
    dataPedido: '2026-11-24',
    itens: [
      { codigoItemPedido: 1, codigoProduto: 1, quantidade: 1, valor: 9800.00 }
    ]
  }
];

export async function initDB(): Promise<void> {
  return Promise.resolve();
}
