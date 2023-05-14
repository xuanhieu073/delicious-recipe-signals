import { CommonModule, JsonPipe } from '@angular/common';
import { Component, Input, OnDestroy, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RecipeCardComponent } from '@components/recipe-card/recipe-card.component';
import { BackendService } from '@services/backend.service';
import { CategoryService } from '@services/category.service';
import { switchMap } from 'rxjs';

@Component({
  standalone: true,
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative gap-6">
      <cous-recipe-card [recipe]="recipe" *ngFor="let recipe of recipes()" />
    </div>
  `,
  imports: [CommonModule, JsonPipe, RecipeCardComponent],
})
export class CuisineComponent implements OnDestroy {
  @Input() set cuisine(cuisine: string) {
    this.cuisine$.set(cuisine);
    this.homeService.selectedCategory.set(cuisine);
  }
  cuisine$ = signal('');
  recipes = toSignal(
    toObservable(this.cuisine$).pipe(
      switchMap((cuisine) => {
        return this.backendService.getRecipesByCuisine(cuisine);
      })
    )
  );

  constructor(
    private backendService: BackendService,
    private homeService: CategoryService
  ) {}
  ngOnDestroy(): void {
    this.homeService.selectedCategory.set(null);
  }
}
