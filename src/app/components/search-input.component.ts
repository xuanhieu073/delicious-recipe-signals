import { CommonModule } from '@angular/common';
import { Component, HostListener, effect, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { STORAGE_KEYS, StorageService } from '@services/storage.service';
import { filter, fromEvent } from 'rxjs';

@Component({
  selector: 'cous-search-input',
  standalone: true,
  template: `<div
    class="max-w-[500px] mx-auto bg-black flex px-4 py-2 rounded-xl gap-4"
  >
    <p>🔍</p>
    <input
      class="flex-1 bg-transparent outline-none text-white font-semibold"
      type="text"
      (keydown.enter)="updateSearchString($event)"
      [value]="searchString()"
    />
  </div>`,
  imports: [CommonModule, FormsModule],
})
export class SearchInputComponent {
  searchString = signal(this.storageServcie.get(STORAGE_KEYS.SEARCH_KEY));
  logger = effect(() => {
    this.storageServcie.set(STORAGE_KEYS.SEARCH_KEY, this.searchString());
  });
  constructor(private rotuer: Router, private storageServcie: StorageService) {}
  updateSearchString(event: Event) {
    const searchKey = (event.target as HTMLInputElement).value;
    this.searchString.set(searchKey);
    this.rotuer.navigate([`/searched/${searchKey}`]);
  }
}
