import { Router } from "express";
import { ErrorResponse } from "../models/errors";
import { getArticle, getArticlePreviews } from "../services/article-service";

const publicArticleController = Router();

// Get article previews
publicArticleController.get("/preview", async (request, response) => {
    const count = request.query.count === undefined ? Number.MAX_SAFE_INTEGER : Number.parseInt(request.query.count.toString(), 10);
    const offset = request.query.offset === undefined ? 0 : Number.parseInt(request.query.offset.toString(), 10);

    if (isNaN(count)) {
        const error: ErrorResponse = {
            title: "Count invalid",
            description: "Count invalid. Must be an integer."
        };
        response.status(400).json(error);
        return;
    }

    if (isNaN(offset)) {
        const error: ErrorResponse = {
            title: "Offset invalid",
            description: "Offset invalid. Must be an integer."
        };
        response.status(400).json(error);
        return;
    }

    const articlePreviews = await getArticlePreviews(count, offset);

    if (articlePreviews.length === 0) {
        response.sendStatus(404);
        return;
    }

    response.json(articlePreviews);
});

// Get article by id
publicArticleController.get("/:id", async (request, response) => {
    const articleId = Number.parseInt(request.params.id, 10);

    if (isNaN(articleId)) {
        const error: ErrorResponse = {
            title: "Article ID invalid ",
            description: "Article ID not provided or invalid. Must be an integer."
        };
        response.status(400).json(error);
        return;
    }

    const article = getArticle(articleId);

    if (article === undefined) {
        response.sendStatus(404);
        return;
    }

    response.json(article);
});

export { publicArticleController };