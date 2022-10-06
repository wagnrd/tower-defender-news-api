import {publicArticleController} from "./controllers/article-controller";

interface Article {
    id: number;
    date: Date;
    headline: string;
    body: string;
}

interface ArticlePreview {
    id: Article;
    date: Date;
    thumbnailUrl: string;
    headline: string;
    description: string;
}

interface ArticleWithDetails {
    id: number;
    createdAt: Date;
    publishedAt: Date;
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
        date: arbitraryArticle.publishedAt
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
        date: arbitraryArticle.publishedAt,
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