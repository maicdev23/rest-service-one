import Servidor from './src/server.js';
import { dbconnection } from './src/config/database.js';

import dotenv from 'dotenv'; dotenv.config()

const server = new Servidor()

async function main(){
    await server.listen()
    await dbconnection()
}; main()