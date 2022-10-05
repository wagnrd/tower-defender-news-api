import {Generated, Kysely, MysqlDialect} from "kysely";
import Pool from "mysql2/typings/mysql/lib/Pool";

interface ArticleDAO {
    id: Generated<number>;
    createdAt: Generated<Date>;
    publishedAt: Generated<Date>;
    headline: string;
    body: string;
    description: string;
    thumbnailUrl: string;
}

interface Database {
    article: ArticleDAO;
}

export {Database, ArticleDAO};