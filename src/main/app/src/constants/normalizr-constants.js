import { schema } from 'normalizr';

export const CATEGORY = new schema.Entity('categories');
export const SUB_CATEGORY = new schema.Entity('children');
export const CHILDREN = new schema.Array({ SUB_CATEGORY });
CATEGORY.define({ CHILDREN });

export const CATEGORY_SCHEMA = { categories: [CATEGORY] };
