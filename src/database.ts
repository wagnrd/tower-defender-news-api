import {Generated, Kysely, MysqlDialect} from "kysely";
import {createPool} from "mysql2";

interface ArticleDAO {
    id: Generated<number>;
    createdAt: Generated<Date>;
    publishedAt: Generated<Date>;
    headline: string;
    body: string;
    description: string;
    thumbnailUrl: string;
}

interface HealthDAO {
    test: string;
}

interface DatabaseDAO {
    health: HealthDAO;
    article: ArticleDAO;
}

const database = new Kysely<DatabaseDAO>({
    dialect: new MysqlDialect({
        pool: createPool({
            host: process.env.MYSQL_HOST,
            port: Number.parseInt(process.env.MYSQL_PORT, 10),
            database: process.env.MYSQL_DATABASE,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD
        })
    })
});

export {database};