import { Generated, Kysely, MysqlDialect } from "kysely";
import { createPool } from "mysql2";
import { config } from "../config";

interface ArticleDAO {
    id: Generated<number>;
    creationTimestamp: number;
    publishTimestamp: number;
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
                                                                           pool: createPool(config.database)
                                                                       })
                                         });

export { database };