import express from "express";
import {publicArticleController} from "./controllers/article-controller";
import {publicHealthCheckController} from "./controllers/heath-check-controller";

const port = process.env.PORT || 3000;
const app = express();

app.use("/health", publicHealthCheckController);
app.use("/article", publicArticleController);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}!`);
});