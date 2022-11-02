import express from "express";
import cors from "cors";
import { publicArticleController } from "./controllers/article-controller";
import { publicHealthCheckController } from "./controllers/heath-check-controller";
import { config } from "./config";

const app = express();

app.use(cors());
app.use("/health", publicHealthCheckController);
app.use("/article", publicArticleController);

app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}!`);
});