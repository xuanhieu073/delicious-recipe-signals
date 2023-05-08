import { Injectable } from '@angular/core';

export enum STORAGE_KEYS {
  POPULAR_RECIPES = 'popular-recipes',
  VEGETARIAN_RECIPES = 'vegetarian-recipes',
  CUISINE_RECIPES = 'cuisine-recipes',
  SEARCH_KEY = 'search-key',
  RECIPES_DETAILS = 'recipes-details',
}

@Injectable({ providedIn: 'root' })
export class StorageService {
  set(key: STORAGE_KEYS, value: any) {
    localStorage.setItem(key, value ? JSON.stringify(value) : null);
  }

  get<T = any>(key: STORAGE_KEYS): T {
    const value = localStorage.getItem(key);
    try {
      return JSON.parse(value) as T;
    } catch (e) {
      return value as any;
    }
  }

  remove(key: STORAGE_KEYS) {
    localStorage.removeItem(key);
  }
}
