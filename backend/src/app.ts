import express, {Application} from 'express';
import morgan from 'morgan';

//Importación de rutas 
import productsRoutes from './routes/products-routes';
import mesasRoutes from './routes/mesas-routes';
import usuariosRoutes from './routes/usuarios-routes';

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
    }

    routes(){
        this.app.use('/productos',productsRoutes);
        this.app.use('/mesas',mesasRoutes);
        this.app.use('/usuarios',usuariosRoutes);
    }

    async listen(){
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }
}