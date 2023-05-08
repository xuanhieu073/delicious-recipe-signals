import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, of, tap } from 'rxjs';
import { STORAGE_KEYS, StorageService } from '@services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private readonly apiKey = environment.API_KEY;
  private readonly apiUrl = environment.API_URL;
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}
  getPopularRecipes(recordnumber: number | null = null) {
    const popularRecipes = this.storageService.get(
      STORAGE_KEYS.POPULAR_RECIPES
    );
    if (popularRecipes) {
      return of(popularRecipes);
    } else {
      const number = recordnumber ? `&number=${recordnumber}` : '';
      return this.httpClient
        .get<{ recipes: any[] }>(
          `${this.apiUrl}/recipes/random?apiKey=${this.apiKey}${number}`
        )
        .pipe(
          map(({ recipes }) => recipes),
          tap((recipes) =>
            this.storageService.set(STORAGE_KEYS.POPULAR_RECIPES, recipes)
          )
        );
    }
  }

  getVegetarianRecipes(recordnumber: number | null = null) {
    const popularRecipes = this.storageService.get(
      STORAGE_KEYS.VEGETARIAN_RECIPES
    );
    if (popularRecipes) {
      return of(popularRecipes);
    } else {
      const number = recordnumber ? `&number=${recordnumber}` : '';
      return this.httpClient
        .get<{ recipes: any[] }>(
          `${this.apiUrl}/recipes/random?apiKey=${this.apiKey}&tags=vegetarian${number}`
        )
        .pipe(
          map(({ recipes }) => recipes),
          tap((recipes) =>
            this.storageService.set(STORAGE_KEYS.VEGETARIAN_RECIPES, recipes)
          )
        );
    }
  }

  getRecipesByCuisine(cuisine: string) {
    const cuisineRecipes = this.storageService.get(
      STORAGE_KEYS.CUISINE_RECIPES
    );
    if (cuisineRecipes?.[cuisine]) {
      return of(cuisineRecipes[cuisine]);
    } else {
      return this.httpClient
        .get<{ results: any }>(
          `${this.apiUrl}/recipes/complexSearch?apiKey=${this.apiKey}&cuisine=${cuisine}&number=10`
        )
        .pipe(
          map(({ results }) => results),
          tap((recipes) => {
            return this.storageService.set(STORAGE_KEYS.CUISINE_RECIPES, {
              ...cuisineRecipes,
              [cuisine]: recipes,
            });
          })
        );
    }
  }

  getRecipesBySearchKey(searchKey: string) {
    return this.httpClient
      .get<{ results: any }>(
        `${this.apiUrl}/recipes/complexSearch?apiKey=${this.apiKey}&query=${searchKey}`
      )
      .pipe(map(({ results }) => results));
  }

  getRecipeById(id: string) {
    const recipesDetails = this.storageService.get(
      STORAGE_KEYS.RECIPES_DETAILS
    );
    if (recipesDetails?.[id]) {
      return of(recipesDetails[id]);
    } else {
      return this.httpClient
        .get<any>(
          `${this.apiUrl}/recipes/${id}/information?apiKey=${this.apiKey}`
        )
        .pipe(
          tap((recipes) => {
            return this.storageService.set(STORAGE_KEYS.RECIPES_DETAILS, {
              ...recipesDetails,
              [id]: recipes,
            });
          })
        );
    }
  }
}
