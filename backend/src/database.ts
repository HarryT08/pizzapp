import { DataSource } from 'typeorm';
import { Comanda } from './entities/Comanda';
import { DetalleComanda } from './entities/DetalleComanda';
import { Domicilio } from './entities/Domicilio';
import { MateriaPrima } from './entities/MateriaPrima';
import { Mesa } from './entities/Mesa';
import { Persona } from './entities/Persona';
import { Preparacion } from './entities/Preparacion';
import { Producto } from './entities/Producto';
import { Rol } from './entities/Rol';
import { User } from './entities/User';


export const AppDataSource = new DataSource({
    type: 'mysql',
    host: '47.89.245.144',
    username: 'artdev',
    password: 'desarrollo2022*',
    database: 'pizzapp',
    entities: [Comanda, DetalleComanda, Domicilio, MateriaPrima, Mesa, 
                Persona, Preparacion, Producto, Rol, User]
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