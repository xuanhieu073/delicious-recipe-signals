import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { STORAGE_KEYS, StorageService } from '@services/storage.service';
import { debounceTime } from 'rxjs';

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
      [formControl]="searchControl"
    />
  </div>`,
  imports: [CommonModule, ReactiveFormsModule],
})
export class SearchInputComponent {
  searchControl = new FormControl(this.storage.get(STORAGE_KEYS.SEARCH_KEY));
  constructor(private rotuer: Router, private storage: StorageService) {
    this.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((searchStr) => {
        this.storage.set(STORAGE_KEYS.SEARCH_KEY, searchStr);
      });
  }
  updateSearchString(event: Event) {
    const searchKey = (event.target as HTMLInputElement).value;
    this.rotuer.navigate([`/searched/${searchKey}`]);
  }
}
