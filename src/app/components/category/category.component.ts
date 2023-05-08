import { CommonModule } from '@angular/common';
import { Component, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HomeService } from '@services/home.service';
import { pluck } from 'rxjs';

type Category = {
  cuisine: string;
  name: string;
  icon: string;
};

@Component({
  selector: 'cous-category',
  standalone: true,
  template: `
    <ul class="flex gap-6 justify-center">
      <li *ngFor="let category of categoriesWithSelected()">
        <a
          [class]="
            [
              'rounded-full flex flex-col items-center justify-center w-16 h-16 bg-gradient-to-r',
              category.selected
                ? 'from-red-400 to-red-500'
                : 'from-gray-700 to-gray-800'
            ].join(' ')
          "
          [routerLink]="['/cuisine/' + category.cuisine]"
        >
          <p>{{ category.icon }}</p>
          <p class="text-[10px] text-white font-semibold">
            {{ category.name }}
          </p>
        </a>
      </li>
    </ul>
  `,
  imports: [RouterLink, CommonModule],
})
export class CategoryComponent {
  constructor(private homeService: HomeService) {}
  categories = signal<Category[]>([
    { cuisine: 'Italian', name: 'Italian', icon: '🍕' },
    { cuisine: 'American', name: 'American', icon: '🍔' },
    { cuisine: 'Vietnamese', name: 'Vietnamese', icon: '🍜' },
    { cuisine: 'Japanese', name: 'Japanese', icon: '🥩' },
  ]);
  selectedCategory = toSignal(this.homeService.selectedCategory.asObservable());
  categoriesWithSelected = computed(() =>
    this.categories().map((category) =>
      category.cuisine === this.selectedCategory()
        ? { ...category, selected: true }
        : { ...category, selected: false }
    )
  );
}
