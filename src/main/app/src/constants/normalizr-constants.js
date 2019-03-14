import { schema } from 'normalizr';

const categoryScheme = new schema.Entity('categories');
categoryScheme.define({ categories: [categoryScheme] });

const articleScheme = new schema.Entity('articles');

const CATEGORY_SCHEMA = { categories: [categoryScheme], articles: [articleScheme] };

export { CATEGORY_SCHEMA };

