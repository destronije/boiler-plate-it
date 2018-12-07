import { Server } from './server';
import * as http from 'http';

// create http server
let app = Server.bootstrap().app;

// if environment is dev load certificates, otherwise don't because HTTPS is provided by AWS
let httpServer = http.createServer(app);

// listen on provided ports
httpServer.listen(3000);

httpServer.on('listening', onListening);

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  console.log(`Express serverl listening`);
}
