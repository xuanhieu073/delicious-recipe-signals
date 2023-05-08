import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, map } from 'rxjs';
import { HomeComponent } from '../pages/home/home.component';

@Injectable({ providedIn: 'root' })
export class HomeService {
  selectedCategory = new BehaviorSubject<string>('');
  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(
          (e) =>
            e instanceof ActivationEnd &&
            Object.keys(e.snapshot.params).length == 0 &&
            e.snapshot.routeConfig.path === ''
        )
      )
      .subscribe(() => this.selectedCategory.next(''));
  }
}
