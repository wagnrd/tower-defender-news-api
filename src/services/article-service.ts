import { database } from "../clients/database";
import { ArticlePreview, toArticlePreviewArray } from "../models/article-preview";
import { Article, toArticle } from "../models/article";
import { getLoremIpsumText } from "../clients/lorem-ipsum-client";

async function getArticlePreviews(count: number, offset: number, padding: boolean): Promise<ArticlePreview[]> {
    const articles = await database.selectFrom("article")
                                   .select(["id", "headline", "description", "publishTimestamp", "thumbnailUrl"])
                                   .where("publishTimestamp", "<=", Date.now())
                                   .orderBy("publishTimestamp", "desc")
                                   .offset(offset)
                                   .limit(count)
                                   .execute();

    if (articles === undefined) return [];

    const result = toArticlePreviewArray(articles);

    if (padding && result.length < count) {
        const paddingCount = Math.min(count - result.length, 20);
        const paddingArticles = await generateArticlePreviews(paddingCount,
                                                              result[result.length - 1].id - paddingCount);
        paddingArticles.reverse();
        result.push(...paddingArticles);
    }

    return result;
}

async function getArticle(id: number): Promise<Article> {
    const article = await database.selectFrom("article")
                                  .select(["id", "headline", "body", "publishTimestamp"])
                                  .where("id", "=", id)
                                  .where("publishTimestamp", "<=", Date.now())
                                  .executeTakeFirst();

    if (article === undefined) return undefined;

    return toArticle(article);
}

async function generateArticle(id = 0): Promise<Article> {
    return {
        id,
        timestamp: Date.now(),
        headline: `Lorem ipsum ${id}!`,
        body: await getLoremIpsumText({
                                          paragraphs: 4,
                                          paragraphLength: "long",
                                          decorations: true,
                                          links: true,
                                          lists: true
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
                                 description: await getLoremIpsumText({
                                                                          paragraphs: 1,
                                                                          paragraphLength: "short",
                                                                          decorations: false,
                                                                          links: false,
                                                                          lists: false
                                                                      })
                             });
    }

    return articlePreviews;
}

export { getArticlePreviews, getArticle };