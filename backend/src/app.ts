import express, {Application} from 'express';
import morgan from 'morgan';

//Importación de rutas 
import productsRoutes from './routes/products-routes';

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
    }

    routes(){
        this.app.use('/products',productsRoutes);
    }

    async listen(){
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }
}