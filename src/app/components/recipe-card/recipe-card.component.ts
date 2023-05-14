import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Recipe } from 'src/app/models/Recipe';

@Component({
  selector: 'cous-recipe-card',
  standalone: true,
  template: ` <a
    [routerLink]="['/recipe/' + recipe.id]"
    class="rounded-2xl overflow-hidden relative block"
  >
    <h4
      class="absolute bottom-4 bg-slate-700/30 rounded-lg text-white font-semibold text-center left-1/2 -translate-x-1/2 w-[80%]"
    >
      {{ recipe.title }}
    </h4>
    <img
      class="w-full h-[250px] object-cover"
      [src]="recipe.image"
      alt="recipe-image"
    />
  </a>`,
  imports: [CommonModule, RouterModule],
})
export class RecipeCardComponent {
  @Input({ required: true }) recipe: Recipe;
}
