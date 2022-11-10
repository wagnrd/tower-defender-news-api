import { Request, Router } from "express";
import { ErrorResponse } from "../models/errors";
import { getArticle, getArticlePreviews } from "../services/article-service";

const publicArticleController = Router();

// Get article previews
publicArticleController.get("/preview", async (request, response) => {
    const { error, count, offset, padding } = checkGetArticlePreviewsRequest(request);

    if (error) {
        response.status(error.code).json(error);
        return;
    }

    const articlePreviews = await getArticlePreviews(count, offset, padding);

    if (articlePreviews.length === 0) {
        response.sendStatus(204);
        return;
    }

    response.json(articlePreviews);
});

// Get article by id
publicArticleController.get("/:id", async (request, response) => {
    const { error, articleId, padding } = checkGetArticleByIdRequest(request);

    if (error) {
        response.status(error.code).json(error);
        return;
    }

    const article = await getArticle(articleId, padding);

    if (!article) {
        response.sendStatus(404);
        return;
    }

    response.json(article);
});

function checkGetArticlePreviewsRequest(request: Request): {
    error?: ErrorResponse,
    count?: number,
    offset?: number,
    padding?: boolean
} {
    const count = request.query.count === undefined ?
                  Number.MAX_SAFE_INTEGER :
                  Number.parseInt(request.query.count.toString(), 10);
    const offset = !request.query.offset ? 0 : Number.parseInt(request.query.offset.toString(), 10);
    const padding = !request.query.padding ? 0 : Number.parseInt(request.query.padding.toString(), 10);

    if (isNaN(count)) {
        return {
            error: {
                code: 400,
                title: "Count invalid",
                description: "Count invalid. Must be an integer."
            }
        };
    }

    if (isNaN(offset)) {
        return {
            error: {
                code: 400,
                title: "Offset invalid",
                description: "Offset invalid. Must be an integer."
            }
        };
    }

    if (isNaN(padding)) {
        return {
            error: {
                code: 400,
                title: "Padding invalid",
                description: "Padding invalid. Must be an integer: 0 = false; !0 = true."
            }
        };
    }

    return {
        count,
        offset,
        padding: Boolean(padding)
    };
}

function checkGetArticleByIdRequest(request: Request): {
    error?: ErrorResponse,
    articleId?: number,
    padding?: boolean
} {
    const articleId = Number.parseInt(request.params.id, 10);
    const padding = !request.query.padding ? 0 : Number.parseInt(request.query.padding.toString(), 10);

    if (isNaN(articleId)) {
        return {
            error: {
                code: 400,
                title: "Article ID invalid ",
                description: "Article ID not provided or invalid. Must be an integer."
            }
        };
    }

    if (isNaN(padding)) {
        return {
            error: {
                code: 400,
                title: "Padding invalid",
                description: "Padding invalid. Must be an integer: 0 = false; !0 = true."
            }
        };
    }

    return {
        articleId,
        padding: Boolean(padding)
    };
}

export { publicArticleController };