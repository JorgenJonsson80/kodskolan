import { bokning } from './bokning';
import { schema } from './schema';
import { todo } from './todo';

// Mallarna i Byggstudion, i den ordning de visas.
export const TEMPLATES = [schema, bokning, todo];

export const templateById = id => TEMPLATES.find(item => item.id === id);

// Valen som gäller från början för en mall.
export const defaultFeatures = template =>
  Object.fromEntries(template.features.map(item => [item.id, item.default]));
