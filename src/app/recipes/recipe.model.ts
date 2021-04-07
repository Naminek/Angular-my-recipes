import { Category } from "./categories-filter/category.model";

export interface Ingredients {
  name: string;
  amount: string;
  mark: boolean;
}

export interface Recipe {
  ingredients: Ingredients[];
  added: number;
  category: Category,
  comments: string;
  imagePath: string;
  modified: number;
  steps: string[];
  title: string;
  id: number;
}