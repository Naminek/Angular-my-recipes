import { Category } from "./categories-filter/category.model";

export interface Ingredients {
  name: string;
  amount: string;
  additional: number;
}

export interface Steps {
  description: string;
}

export interface Recipe {
  ingredients: Ingredients[];
  added: number;
  category: Category[],
  comments: string;
  url: string;
  modified: number;
  steps: Steps[];
  title: string;
  id: number;
  timeEstimation: number;
  description: string;
}
