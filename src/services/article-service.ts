import { database } from "../database";
import { ArticlePreview, toArticlePreviewArray } from "../models/article-preview";
import { Article, toArticle } from "../models/article";

async function getArticlePreviews(count: number, offset: number): Promise<ArticlePreview[]> {
    const articles = await database.selectFrom("article")
        .select(["id", "headline", "description", "publishTimestamp", "thumbnailUrl"])
        .where("publishTimestamp", "<=", Date.now())
        .orderBy("publishTimestamp", "desc")
        .offset(offset)
        .limit(count)
        .execute();

    if (articles === undefined)
        return [];

    return toArticlePreviewArray(articles);
}

async function getArticle(id: number): Promise<Article> {
    const article = await database.selectFrom("article")
        .select(["id", "headline", "body", "publishTimestamp"])
        .where("id", "=", id)
        .where("publishTimestamp", "<=", Date.now())
        .executeTakeFirst();

    if (article === undefined)
        return undefined;

    return toArticle(article);
}

export { getArticlePreviews, getArticle };