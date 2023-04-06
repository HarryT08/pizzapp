import * as dotenv from "dotenv";
let path;
switch (process.env.NODE_ENV) {
    case "production":
        path = `${__dirname}/../../.env.production`
        break;
    default:
        path = `${__dirname}/../../.env.development`
}
dotenv.config({ path : path })
