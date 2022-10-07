interface Article {
    id: number;
    timestamp: number;
    headline: string;
    body: string;
}

interface ArticlePreview {
    id: Article;
    timestamp: number;
    thumbnailUrl: string;
    headline: string;
    description: string;
}

interface ArticleWithDetails {
    id: number;
    creationTimestamp: number;
    publishTimestamp: number;
    thumbnailUrl: string;
    headline: string;
    body: string;
    description: string;
}

interface ErrorResponse {
    title: string;
    description: string;
}

function toArticle(arbitraryArticle: any): Article {
    return {
        id: arbitraryArticle.id,
        headline: arbitraryArticle.headline,
        body: arbitraryArticle.body,
        timestamp: arbitraryArticle.publishTimestamp
    };
}

function toArticleArray(arbitraryArticles: any[]): Article[] {
    const articles: Article[] = [];

    for (const articleWithDetails of arbitraryArticles)
        articles.push(toArticle(articleWithDetails));

    return articles;
}

function toArticlePreview(arbitraryArticle: any): ArticlePreview {
    return {
        id: arbitraryArticle.id,
        headline: arbitraryArticle.headline,
        description: arbitraryArticle.description,
        timestamp: arbitraryArticle.publishTimestamp,
        thumbnailUrl: arbitraryArticle.thumbnailUrl
    };
}

function toArticlePreviewArray(arbitraryArticles: any[]): ArticlePreview[] {
    const articlePreviews: ArticlePreview[] = [];

    for (const articleWithDetails of arbitraryArticles)
        articlePreviews.push(toArticlePreview(articleWithDetails));

    return articlePreviews;
}

export {
    Article,
    ArticlePreview,
    ArticleWithDetails,
    ErrorResponse,
    toArticle,
    toArticleArray,
    toArticlePreview,
    toArticlePreviewArray
};