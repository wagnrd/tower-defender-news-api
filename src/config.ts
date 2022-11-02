interface DatabaseConfig {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
}

interface Config {
    port: number;
    loremIpsumUrl: string;
    database: DatabaseConfig;
}

const config: Config = {
    port: Number.parseInt(process.env.PORT, 10) || 3000,
    loremIpsumUrl: "https://loripsum.net/api",
    database: {
        host: process.env.MYSQL_HOST,
        port: Number.parseInt(process.env.MYSQL_PORT, 10),
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    }
};

export { config };