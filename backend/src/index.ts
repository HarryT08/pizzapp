import './config' //Configuration of enviroment variables
import 'reflect-metadata';
import { App } from './app';
import { AppDataSource } from './database';

async function main() {
  try {
    const app = new App();
    await AppDataSource.initialize(); // Initialize the database connection
    console.log('Database connection initialized');
    app.listen();
  } catch (error) {
    console.log(error);
  }
}

main();
