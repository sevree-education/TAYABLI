// src/types/index.ts
export interface Recipe {
  id: string;
  title: string;
  description: string;
  image_url: string;
  cooking_time_minutes: number;
  difficulty_level: 'Sahl' | 'Average' | 'Pro';
  category: string;
  author_id?: string;
  created_at: string;
}

export interface Ingredient {
  id: string;
  recipe_id: string;
  item_name: string;
  quantity: string;
}