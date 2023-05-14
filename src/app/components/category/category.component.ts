import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '@services/category.service';

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
          [routerLink]="['/cuisine/', category.cuisine]"
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
  constructor(private homeService: CategoryService) {}
  categories = signal<Category[]>([
    { cuisine: 'Italian', name: 'Italian', icon: '🍕' },
    { cuisine: 'American', name: 'American', icon: '🍔' },
    { cuisine: 'Vietnamese', name: 'Viet', icon: '🍜' },
    { cuisine: 'Japanese', name: 'Japanese', icon: '🥩' },
  ]);
  selectedCategory = this.homeService.selectedCategory;
  categoriesWithSelected = computed(() =>
    this.categories().map((category) =>
      category.cuisine === this.selectedCategory()
        ? { ...category, selected: true }
        : { ...category, selected: false }
    )
  );
}
