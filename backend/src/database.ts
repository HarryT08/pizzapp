import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Persona } from './entities/Persona';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: '47.89.245.144',
    username: 'artdev',
    password: 'desarrollo2022*',
    database: 'pizzapp',
    entities: [User,Persona]
})


//Con el cambio a typeorm, este metodo ya no es necesario, lo siento ING harold y ING cristian

// export async function connect(){
//     const connection = createPool({
//         host: '47.89.245.144',
//         user: 'artdev',
//         password: 'desarrollo2022*',
//         database: 'pizzapp',
//         connectionLimit: 10
//     });
//     return connection;
// }