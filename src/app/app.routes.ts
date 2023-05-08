import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'cuisine/:cuisine',
    loadComponent: () =>
      import('@pages/cuisine/cuisine.component').then(
        (m) => m.CuisineComponent
      ),
  },
  {
    path: 'searched/:key',
    loadComponent: () =>
      import('@pages/search-results/search-results.component').then(
        (m) => m.SearchResultsComponent
      ),
  },
  {
    path: 'recipe/:id',
    loadComponent: () =>
      import('@pages/recipe-details/recipe-details.component').then(
        (m) => m.RecipeDetailsComponent
      ),
  },
];
