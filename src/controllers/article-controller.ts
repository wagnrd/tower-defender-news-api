import {database} from "../database";
import {Router} from "express";
import {ErrorResponse, Article, toArticleArray, toArticlePreview} from "../models";

const publicArticleController = Router();

// Get all articles
publicArticleController.get("/", async (request, response) => {
    const articles = await database.selectFrom("article")
        .select(["id", "headline", "body", "publishedAt"])
        .where("publishedAt", "<=", new Date())
        .orderBy("publishedAt", "desc")
        .execute();

    if (articles == null) {
        response.sendStatus(404);
        return;
    }

    const formattedArticles = toArticleArray(articles);
    response.json(articles);
})

// Get article by id
publicArticleController.get("/:id", async (request, response) => {
    let articleId;

    try {
        articleId = Number.parseInt(request.params.id, 10);
    } catch (e) {
        const error: ErrorResponse = {
            title: "Invalid article ID",
            description: "Article ID not provided or invalid. Must be a number."
        }
        response.status(400).json(error);
        return;
    }

    const article = await database.selectFrom("article")
        .select(["id", "headline", "description", "publishedAt", "thumbnailUrl"])
        .where("id", "=", articleId)
        .where("publishedAt", "<=", new Date())
        .executeTakeFirst();

    if (article == null) {
        response.sendStatus(404);
        return;
    }

    const formattedArticlePreview = toArticlePreview(article);
    response.json(formattedArticlePreview);
})

export {publicArticleController};