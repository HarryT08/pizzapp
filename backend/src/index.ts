import 'reflect-metadata';
import {App} from './app';
import { connect } from './database';
async function main(){
    const app = new App();
    app.listen();
}

main();