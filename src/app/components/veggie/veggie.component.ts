import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RecipeCardComponent } from '@components/recipe-card/recipe-card.component';
import { BackendService } from '@services/backend.service';
import { tap } from 'rxjs';
import { SwiperOptions } from 'swiper';
import { SwiperModule } from 'swiper/angular';

@Component({
  selector: 'cous-veggie',
  standalone: true,
  template: ` <h2 class="text-xl font-semibold mb-6">Our Vegetarian Picks</h2>
    <swiper [config]="config()">
      <ng-container *ngFor="let recipe of recipes()">
        <ng-template swiperSlide>
          <cous-recipe-card [recipe]="recipe" />
        </ng-template>
      </ng-container>
    </swiper>`,
  imports: [CommonModule, SwiperModule, RecipeCardComponent],
})
export class VeggieComponent {
  config = signal<SwiperOptions>({
    slidesPerView: 2,
    spaceBetween: 24,
    loop: true,
    breakpoints: {
      767: {
        slidesPerView: 4,
      },
    },
  });
  recipes = toSignal(this.backendService.getVegetarianRecipes(9));
  constructor(private backendService: BackendService) {}
}
