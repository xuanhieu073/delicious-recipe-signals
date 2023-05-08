import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { RecipeCardComponent } from '@components/recipe-card/recipe-card.component';
import { HomeService } from '@services/home.service';
import { BackendService } from '@services/backend.service';
import { map, pluck, switchMap, tap } from 'rxjs';

@Component({
  standalone: true,
  template: `
    <div class="container grid grid-cols-4 relative gap-6">
      <cous-recipe-card [recipe]="recipe" *ngFor="let recipe of recipes()" />
    </div>
  `,
  imports: [CommonModule, JsonPipe, RecipeCardComponent],
})
export class CuisineComponent {
  recipes = toSignal(
    this.route.params.pipe(
      map((params) => {
        const cuisine = params['cuisine'] || '';
        this.homeService.selectedCategory.next(cuisine);
        return cuisine;
      }),
      switchMap((cuisine) => {
        return this.backendService.getRecipesByCuisine(cuisine);
      })
    )
  );
  constructor(
    private backendService: BackendService,
    private route: ActivatedRoute,
    private homeService: HomeService
  ) {}
}
