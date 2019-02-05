import { schema } from 'normalizr';

const categoryScheme = new schema.Entity('categories');
categoryScheme.define({ categories: [categoryScheme] });

const CATEGORY_SCHEMA = { categories: [categoryScheme] };

export { CATEGORY_SCHEMA };

