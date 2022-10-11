import { createPool } from 'mysql2/promise';

export async function connect(){
    const connection = createPool({
        host: 'us-east.connect.psdb.cloud',
        user: '54xdsdbw2xdcatb4q4d8',
        password: 'pscale_pw_pPBxaMAMVqp1DxTRjbEyA4Xz5j5eQ1yquAq6Y6JmQUO',
        database: 'pizzapp',
        connectionLimit: 10,        
        ssl: {
            rejectUnauthorized: false
        }
    });
    
    return connection;
}