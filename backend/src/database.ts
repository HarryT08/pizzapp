import { createPool } from 'mysql2/promise';

export async function connect(){
    const connection = createPool({
        host: '47.89.245.144',
        user: 'artdev',
        password: 'desarrollo2022*',
        database: 'pizzapp',
        connectionLimit: 10,
    });
    return connection;
}