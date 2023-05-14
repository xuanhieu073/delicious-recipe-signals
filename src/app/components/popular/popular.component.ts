import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { RecipeCardComponent } from '@components/recipe-card/recipe-card.component';
import { BackendService } from '@services/backend.service';
import { interval, tap } from 'rxjs';
import { SwiperOptions } from 'swiper';
import { SwiperComponent, SwiperModule } from 'swiper/angular';

@Component({
  selector: 'cous-popular',
  standalone: true,
  template: `<h2 class="text-xl font-semibold mb-6">Popular Picks</h2>
    <swiper #swiper [config]="config">
      <ng-container *ngFor="let recipe of recipes()">
        <ng-template swiperSlide>
          <cous-recipe-card [recipe]="recipe" />
        </ng-template>
      </ng-container>
    </swiper> `,
  imports: [CommonModule, SwiperModule, RecipeCardComponent],
})
export class PopularComponent {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    breakpoints: {
      767: {
        slidesPerView: 3,
      },
    },
  };
  recipes = toSignal(this.randomRecipesService.getPopularRecipes(9));

  constructor(private randomRecipesService: BackendService) {
    interval(3000)
      .pipe(
        takeUntilDestroyed(),
        tap(() => {
          this.swiper.swiperRef.slideNext();
        })
      )
      .subscribe(() => {});
  }
}
