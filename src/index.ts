import express from "express";
import {database} from "./database";
import {publicArticleController} from "./controllers/article-controller";

const port = process.env.PORT || 3000;
const app = express();

app.use("/article", publicArticleController);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}!`);
});