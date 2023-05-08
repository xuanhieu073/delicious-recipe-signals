import { BackendService } from '@services/backend.service';
import { Component, signal } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { map, tap } from 'rxjs';
import { RecipeCardComponent } from '@components/recipe-card/recipe-card.component';

@Component({
  selector: 'cous-popular',
  standalone: true,
  template: `<h2 class="text-xl font-semibold mb-6">Popular Picks</h2>
    <swiper [slidesPerView]="3" [spaceBetween]="24">
      <ng-container *ngFor="let recipe of recipes()">
        <ng-template swiperSlide>
          <cous-recipe-card [recipe]="recipe" />
        </ng-template>
      </ng-container>
    </swiper> `,
  imports: [CommonModule, SwiperModule, RecipeCardComponent],
})
export class PopularComponent {
  recipes = toSignal(this.randomRecipesService.getPopularRecipes(9));

  constructor(private randomRecipesService: BackendService) {}
}
