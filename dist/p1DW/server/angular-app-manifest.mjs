
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/detalhe"
  },
  {
    "renderMode": 2,
    "route": "/cesta"
  },
  {
    "renderMode": 2,
    "route": "/busca"
  },
  {
    "renderMode": 2,
    "route": "/esqueci-senha"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 986, hash: '868642b0e33114d1', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1526, hash: '7b00021462d5be12', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 18894, hash: 'b69b9c3990b28321', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'detalhe/index.html': {size: 11196, hash: '2a677e582621a73f', text: () => import('./assets-chunks/detalhe_index_html.mjs').then(m => m.default)},
    'esqueci-senha/index.html': {size: 12733, hash: '5e676065a21cb052', text: () => import('./assets-chunks/esqueci-senha_index_html.mjs').then(m => m.default)},
    'cesta/index.html': {size: 11376, hash: '2d0ea14cd414439f', text: () => import('./assets-chunks/cesta_index_html.mjs').then(m => m.default)},
    'busca/index.html': {size: 13592, hash: '80c269822f8de46e', text: () => import('./assets-chunks/busca_index_html.mjs').then(m => m.default)}
  },
};
