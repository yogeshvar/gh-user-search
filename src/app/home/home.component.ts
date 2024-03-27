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
        <div *ngIf="loading && !errorMessage" class="loading-text">
          Loading...
        </div>
        <div *ngIf="errorMessage && !loading" class="error-text">
          {{ errorMessage }}
        </div>
        <div
          *ngIf="usersList.length === 0 && !errorMessage"
          class="loading-text"
        >
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
  errorMessage = '';
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
      .subscribe({
        next: (users) => {
          this.usersList = users.items;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'There was an error! Please try again.';
        },
        complete: () => {
          console.log('Completed!');
          this.loading = false;
        },
      });
  }

  ngOnInit(): void {
    this.loading = true;
    this.apiService.getAllUsers().subscribe({
      next: (users) => {
        this.usersList = users.items;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.error('There was an error!', error);
        this.errorMessage = 'There was an error! Please try again.';
      },
      complete: () => {
        console.log('Completed!');
        this.loading = false;
      },
    });
  }

  searchValue(value: string): void {
    this.searchSubject.next(value);
  }
}
