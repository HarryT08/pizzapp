import * as dotenv from "dotenv";
var path = require('path');
let pathenv;
switch (process.env.NODE_ENV) {
    case "production":
        pathenv = path.join(__dirname, '/../../.env.production')
        break;
    default:
        pathenv = path.join(__dirname, '/../../.env.development')
}
dotenv.config({ path : pathenv })
