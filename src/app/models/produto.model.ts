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