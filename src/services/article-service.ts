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
        console.info("[article-previews] Padding enabled. Generating", paddingCount, "articles...");
        const paddingArticles = await generateArticlePreviews(paddingCount,
                                                              result[result.length - 1].id + 1);
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

    for (let id = startId; id <= startId + count; ++id) {
        articlePreviews.push({
                                 id,
                                 timestamp: Date.now(),
                                 headline: `Lorem ipsum ${id}!`,
                                 description: await getLoremIpsumText({
                                                                          paragraphs: 1,
                                                                          paragraphLength: "short",
                                                                          decorations: false,
                                                                          links: false,
                                                                          lists: false
                                                                      })
                             });
        console.info("[article-previews] Article with id", id, "generated");
    }

    return articlePreviews;
}

export { getArticlePreviews, getArticle };