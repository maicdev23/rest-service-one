import Servidor from './src/server.js';
import { config } from 'dotenv';

if(process.env.NODE_ENV !== 'production'){
    config()
}

const server = new Servidor()
server.listen()