interface DatabaseConfig {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
}

interface PlaceholderApiConfig {
    textUrl: string;
    imageUrl: string;
}

interface Config {
    port: number;
    placeholderApi: PlaceholderApiConfig;
    database: DatabaseConfig;
}

const config: Config = {
    port: Number.parseInt(process.env.PORT, 10) || 3000,
    placeholderApi: {
        textUrl: "https://loripsum.net/api",
        imageUrl: "https://picsum.photos/800/450",
    },
    database: {
        host: process.env.MYSQL_HOST,
        port: Number.parseInt(process.env.MYSQL_PORT, 10),
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    }
};

export { config };