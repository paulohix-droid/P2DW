
export default {
  basePath: '/',
  allowedHosts: [
  "localhost",
  "localhost:4200",
  "localhost:4000",
  "127.0.0.1",
  "127.0.0.1:4200",
  "127.0.0.1:4000"
],
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
