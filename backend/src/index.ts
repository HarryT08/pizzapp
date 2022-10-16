import 'reflect-metadata';
import {App} from './app';
import { AppDataSource }  from './database';

async function main(){
  try{
    await AppDataSource.initialize(); // Initialize the database connection
    console.log( 'Database connection initialized' );
    const app = new App();
    app.listen();
  }catch(error){
    console.log(error);
  }
}

main();