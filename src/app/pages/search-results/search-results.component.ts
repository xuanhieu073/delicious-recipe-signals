import { pluck, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeCardComponent } from '@components/recipe-card/recipe-card.component';
import { BackendService } from '@services/backend.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ng-container *ngFor="let recipe of recipes()">
        <cous-recipe-card [recipe]="recipe" />
      </ng-container>
    </div>
  `,
  imports: [CommonModule, RecipeCardComponent],
})
export class SearchResultsComponent {
  recipes = toSignal(
    this.route.params.pipe(
      pluck('key'),
      switchMap((searchKey: string) =>
        this.backendService.getRecipesBySearchKey(searchKey)
      )
    )
  );
  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService
  ) {}
}
