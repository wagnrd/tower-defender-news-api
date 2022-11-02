import { config } from "../config";
import { database } from "../clients/database";
import { ArticlePreview, toArticlePreviewArray } from "../models/article-preview";
import { Article, toArticle } from "../models/article";
import { getPlaceholderText } from "../clients/placeholder-text-client";

async function getArticlePreviews(count: number, offset: number, padding: boolean): Promise<ArticlePreview[]> {
    const articlePreviewDAOs = await database.selectFrom("article")
                                             .select(
                                                 ["id", "headline", "description", "publishTimestamp", "thumbnailUrl"])
                                             .where("publishTimestamp", "<=", Date.now())
                                             .orderBy("publishTimestamp", "desc")
                                             .offset(offset)
                                             .limit(count)
                                             .execute();

    const articlePreviews = articlePreviewDAOs ? toArticlePreviewArray(articlePreviewDAOs) : [];

    if (padding && articlePreviews.length < count) {
        const paddingCount = Math.min(count - articlePreviews.length, 50);
        const startId = articlePreviews.length > 0 ? articlePreviews[articlePreviews.length - 1].id - paddingCount : 0;
        const paddingArticles = await generateArticlePreviews(paddingCount, startId);
        articlePreviews.push(...paddingArticles.reverse());
    }

    return articlePreviews;
}

async function getArticle(id: number, padding: boolean): Promise<Article> {
    const articleDAO = await database.selectFrom("article")
                                     .select(["id", "headline", "body", "publishTimestamp"])
                                     .where("id", "=", id)
                                     .where("publishTimestamp", "<=", Date.now())
                                     .executeTakeFirst();

    if (articleDAO) {
        return toArticle(articleDAO);
    } else if (padding) {
        return generateArticle(id);
    }

    return undefined;
}

async function generateArticle(id = 0): Promise<Article> {
    return {
        id,
        timestamp: Date.now(),
        headline: `Lorem ipsum ${id}!`,
        body: await getPlaceholderText({
                                           paragraphs: 4,
                                           paragraphLength: "long",
                                           decorations: true
                                       }),
    };
}

async function generateArticlePreviews(count: number, startId = 0): Promise<ArticlePreview[]> {
    const articlePreviews: ArticlePreview[] = [];
    const timestamp = Date.now();

    for (let id = startId; id < startId + count; ++id) {
        articlePreviews.push({
                                 id,
                                 timestamp,
                                 headline: `Lorem ipsum ${id}!`,
                                 description: await getPlaceholderText({
                                                                           paragraphs: 1,
                                                                           paragraphLength: "short",
                                                                           decorations: false
                                                                       }),
                                 thumbnailUrl: config.placeholderApi.imageUrl
                             });
    }

    return articlePreviews;
}

export { getArticlePreviews, getArticle };