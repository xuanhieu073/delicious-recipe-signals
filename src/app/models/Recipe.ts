export type Recipe = {
  id: string;
  title: string;
  image: string;
  summary: string;
  instructions: string;
  extendedIngredients: { original: string }[];
};
