import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
export class AppComponent {}
