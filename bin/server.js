//importar módulos
const app = require('../src/app');
const http = require('http');
const debug = require('debug')('curso_web:server');

//configura porta
const port = 3000;
app.set('port', port);

//criar servidor
const server = http.createServer(app);

//ficar ouvindo a porta...
server.listen(port, () => console.log(`API rodando na porta ${port}`));

server.on('error', onError);
server.on('listening', onListening);

//funções tiradas do gerador de função do express:

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + 'required elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + 'is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
