export class ItemPedido {
  codigoItemPedido?: number;
  codigoProduto: number = 0;
  quantidade: number = 1;
  valor: number = 0;
}

export class Pedido {
  codigoPedido: number = 0;
  codigoCliente: number = 0;
  valorTotal: number = 0;
  entrega: string = '';
  obs: string = '';
  dataPedido?: string = '';
  itens?: ItemPedido[] = [];
}
