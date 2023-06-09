import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '@services/backend.service';
import { pluck, switchMap } from 'rxjs';

@Component({
  standalone: true,
  template: `<div
    class="flex flex-col md:flex-row gap-x-20 gap-y-6"
    *ngIf="recipeDetails()"
  >
    <div class="flex flex-col gap-4 flex-shrink-0">
      <h2 class="max-w-[400px] tex-2xl font-semibold">
        {{ recipeDetails().title }}
      </h2>
      <img class="w-full" [src]="recipeDetails().image" alt="" />
    </div>
    <div class="flex flex-col gap-6">
      <div class="flex justify-center md:justify-start gap-4">
        <button
          class="inline-block py-3 px-6 border-2 border-gray-900 font-semibold"
          [class]="
            activeTab() !== 'instructions'
              ? 'text-gray-900 bg-white'
              : 'text-white bg-gray-900 '
          "
          (click)="activeInstructions()"
        >
          Instructions
        </button>
        <button
          class="inline-block py-3 px-6 border-2 border-gray-900 font-semibold"
          [class]="
            activeTab() !== 'ingredients'
              ? 'text-gray-900 bg-white'
              : 'text-white border bg-gray-900'
          "
          (click)="activeIngredients()"
        >
          Ingredients
        </button>
      </div>
      <div *ngIf="activeTab() === 'instructions'; else ingredients">
        <h3 [innerHTML]="recipeDetails().summary"></h3>
        <h3 [innerHTML]="recipeDetails().instructions"></h3>
      </div>
      <ng-template #ingredients>
        <ul>
          <li
            class="list-disc"
            *ngFor="let ingredient of recipeDetails().extendedIngredients"
          >
            {{ ingredient.original }}
          </li>
        </ul>
      </ng-template>
    </div>
  </div>`,
  imports: [CommonModule],
})
export class RecipeDetailsComponent {
  activeTab = signal<'instructions' | 'ingredients'>('instructions');
  recipeDetails = toSignal(
    this.route.params.pipe(
      pluck('id'),
      switchMap((id) => this.backendService.getRecipeById(id))
    )
  );
  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService
  ) {}

  activeInstructions() {
    this.activeTab.set('instructions');
  }

  activeIngredients() {
    this.activeTab.set('ingredients');
  }
}
