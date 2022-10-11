import 'reflect-metadata';
import {App} from './app';

async function main(){
    const app = new App();
    app.listen();
}

main();