import {database} from "../database";
import {Router} from "express";
import {ErrorResponse, toArticle, toArticlePreviewArray} from "../models";

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

    const articles = await database.selectFrom("article")
        .select(["id", "headline", "description", "publishTimestamp", "thumbnailUrl"])
        .where("publishTimestamp", "<=", Date.now())
        .orderBy("publishTimestamp", "desc")
        .offset(offset)
        .limit(count)
        .execute();

    if (articles === undefined) {
        response.sendStatus(404);
        return;
    }

    const result = toArticlePreviewArray(articles);
    response.json(result);
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

    const article = await database.selectFrom("article")
        .select(["id", "headline", "body", "publishTimestamp"])
        .where("id", "=", articleId)
        .where("publishTimestamp", "<=", Date.now())
        .executeTakeFirst();

    if (article === undefined) {
        response.sendStatus(404);
        return;
    }

    const result = toArticle(article);
    response.json(result);
});

export {publicArticleController};