import "reflect-metadata";
import { ConnectionOptions } from "typeorm";
import * as dotenv from 'dotenv'
dotenv.config()

export let dbOptions: ConnectionOptions = {
    type: process.env.DB_CONNECTION as any,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as any,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    "synchronize": false,
    "logging": true,
    "entities": ["src/entity/**/*.ts"],
    "migrations": [
       "src/migration/**/*.ts"
     ],
    "subscribers": ["src/subscriber/**/*.ts"],
     "cli": {
       "entitiesDir": "src/entity",
       "migrationsDir": "src/migration",
       "subscribersDir": "src/subscriber"
     }
}