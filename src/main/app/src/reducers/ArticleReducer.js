export function loadArticles(state, action) {
    if (action.payload.articles) {
        const articles = action.payload.articles.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {});
        const articleIds = action.payload.articles.map(item => item.id);
        const entities = { ...state.categories.entities };
        const result = { ...state.categories.result };

        entities.categories[action.payload.categoryId] = {
            ...entities.categories[action.payload.categoryId],
            articles: articleIds,
        };

        return Object.assign({}, state, {
            categories: { entities, result },
            articles: { ...state.articles, articles },
            error: '',
        });
    }
    return state;
}

export function addArticle(state, action) {
    const article = action.payload;
    const entities = { ...state.categories.entities };
    const result = { ...state.categories.result };

    entities.categories[action.payload.categoryId].articles.concat(article.id);

    return Object.assign({}, state, {
        categories: { entities, result },
        articles: { ...state.articles, articles: { [article.id]: article } },
        error: '',
    });
}

export function updateArticle(state, action) {
    const entities = { ...state.categories.entities };
    const result = { ...state.categories.result };
    const oldArticle = action.payload.oldArticle;
    const newArticle = action.payload.newArticle;
    const articles = { ...state.articles.articles };

    if (oldArticle.categoryId !== newArticle.categoryId) {
        entities.categories[oldArticle.categoryId].articles =
            entities.categories[oldArticle.categoryId].articles.filter(oldArticle.id);
        entities.categories[newArticle.categoryId].articles =
            entities.categories[newArticle.categoryId].articles.concat(oldArticle.id);
    }
    articles[newArticle.id] = newArticle;

    return Object.assign({}, state, {
        categories: { entities, result },
        articles: { articles },
        error: '',
    });
}

export function likeArticle(state, action) {
    console.log('liking', action.payload);
    const entities = { ...state.categories.entities };
    const result = { ...state.categories.result };
    const article = action.payload;
    const articles = { ...state.articles.articles };
    console.log('articles before', articles);
    articles[article.id] = article;
    console.log('articles after', articles);
    return Object.assign({}, state, {
        categories: { entities, result },
        articles: { articles },
        error: '',
    });
}
