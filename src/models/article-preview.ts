interface ArticlePreview {
    id: number;
    timestamp: number;
    thumbnailUrl?: string;
    headline: string;
    description: string;
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

    for (const articleWithDetails of arbitraryArticles) {
        articlePreviews.push(toArticlePreview(articleWithDetails));
    }

    return articlePreviews;
}

export {
    ArticlePreview,
    toArticlePreview,
    toArticlePreviewArray
};