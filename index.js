import Servidor from './src/server.js';
import { dbconnection } from './src/config/database.js';

const server = new Servidor()

async function main() {
    await dbconnection()
    server.listen()
}; main()