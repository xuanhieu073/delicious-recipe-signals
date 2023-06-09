import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CategoryComponent } from '@components/category/category.component';
import { SearchInputComponent } from '@components/search-input.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="container flex flex-col gap-10">
      <a routerLink="/">
        <img class="w-20 h-20" src="../assets/images/logo.png" alt="" />
      </a>
      <cous-search-input />
      <cous-category />
      <router-outlet class="hidden"></router-outlet>
    </div>
    <footer class="p-10 text-center bg-gray-900 text-white mt-6">
      thanks for visit my signals demo application 🖐️🥰
    </footer>
  `,
  styles: [],
  imports: [
    CommonModule,
    RouterOutlet,
    CategoryComponent,
    SearchInputComponent,
    RouterLink,
  ],
})
export class AppComponent {
  constructor() {}
}
