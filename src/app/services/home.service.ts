import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, map } from 'rxjs';
import { HomeComponent } from '../pages/home/home.component';

@Injectable({ providedIn: 'root' })
export class HomeService {
  selectedCategory = new BehaviorSubject<string>('');
}
