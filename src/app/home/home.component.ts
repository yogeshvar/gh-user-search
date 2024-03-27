import { ApiService } from './../api.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { User } from '../user';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, UserComponent],
  template: `
    <div>
      <p>Github Search App</p>
      <form>
        <input
          type="text"
          placeholder="Search Users in Github"
          #search
          (keyup)="searchValue(search.value)"
        />
        <button
          class="primary"
          type="button"
          (click)="searchValue(search.value)"
        >
          Search
        </button>
      </form>
      <section class="results">
        <div *ngIf="loading" class="loading-text">Loading...</div>
        <div *ngIf="usersList.length === 0" class="loading-text">
          Loading...
        </div>
        <app-user *ngFor="let u of usersList" [user]="u"></app-user>
      </section>
    </div>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  usersList: User[] = [];
  loading = false;
  private searchSubject = new Subject<string>();

  constructor(private apiService: ApiService) {
    this.searchSubject
      .pipe(
        debounceTime(2000),
        distinctUntilChanged(),
        switchMap((value) => {
          this.loading = true;
          if (value) {
            return this.apiService.getAllUsers(value);
          } else {
            return this.apiService.getAllUsers();
          }
        })
      )
      .subscribe((users) => {
        this.usersList = users.items;
        this.loading = false;
      });
  }

  ngOnInit(): void {
    this.apiService.getAllUsers().subscribe((users) => {
      this.usersList = users.items;
      this.loading = false;
    });
  }

  searchValue(value: string): void {
    this.searchSubject.next(value);
  }
}
