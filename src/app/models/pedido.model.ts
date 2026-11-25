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