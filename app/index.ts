import { Server } from './server';
import * as http from 'http';

// create http server
let app = Server.bootstrap().app;

let httpServer = http.createServer(app);

httpServer.listen(3000);

httpServer.on('listening', onListening);

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  console.log(`Express server listening`);
}
