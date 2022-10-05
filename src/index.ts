import express from "express";
import {createPool} from "mysql2";
import {
    Kysely,
    MysqlDialect,
} from 'kysely'
import {Database} from "./database";

const port = process.env.PORT || 3000;
const app = express();
const db = new Kysely<Database>({
    dialect: new MysqlDialect({
        pool: createPool({
            host: process.env.MYSQL_HOST,
            port: Number.parseInt(process.env.MYSQL_PORT, 10),
            database: process.env.MYSQL_DATABASE,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD
        })
    })
})

app.get("/article", async (reqest, response) => {
    const articles = await db.selectFrom("article")
        .selectAll()
        .where("publishedAt", "<=", new Date())
        .orderBy("publishedAt", "desc")
        .execute();

    response.json(articles);
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}!`);
})