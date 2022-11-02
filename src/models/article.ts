interface Article {
    id: number;
    timestamp: number;
    headline: string;
    body: string;
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

export {
    Article,
    toArticle,
    toArticleArray
};