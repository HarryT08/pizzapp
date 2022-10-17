import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';

//Importación de rutas 
import productsRoutes from './routes/productos-routes';
import mesasRoutes from './routes/mesas-routes';
import usuariosRoutes from './routes/usuarios-routes';
import personasRoutes from './routes/personas-routes';

export class App{

    private app: Application;

    constructor(){
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings(){
        this.app.set('port', process.env.PORT || 3000);
    }

    middlewares(){
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(cors());
    }

    routes(){
        this.app.use('/productos',productsRoutes);
        this.app.use('/mesas',mesasRoutes);
        this.app.use('/usuarios',usuariosRoutes);
        this.app.use('/personas',personasRoutes);
    }

    async listen(){
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }
}