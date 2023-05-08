import { Component } from '@angular/core';
import { PopularComponent } from '@components/popular/popular.component';
import { VeggieComponent } from '@components/veggie/veggie.component';

@Component({
  standalone: true,
  template: `
    <div class="container">
      <div class="flex gap-10 flex-col">
        <cous-popular />
        <cous-veggie />
      </div>
    </div>
  `,
  imports: [PopularComponent, VeggieComponent],
})
export class HomeComponent {}
