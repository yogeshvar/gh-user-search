import { CommonModule } from '@angular/common';
import { ApiService } from './../api.service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="details">
      <p class="details-heading">User Details</p>
      <p *ngIf="!userDetails">Loading...</p>
      <a *ngIf="userDetails" [routerLink]="['/']">Back</a>
      <div *ngIf="userDetails">
        <img
          [src]="userDetails.avatar_url"
          alt="User avatar"
          class="avatar-img"
        />
        <table class="details-table">
          <tr>
            <td>Username</td>
            <td>{{ userDetails.login }}</td>
          </tr>
          <tr>
            <td>Gravatar ID</td>
            <td>{{ userDetails.gravatar_id }}</td>
          </tr>
          <tr>
            <td>ID</td>
            <td>{{ userDetails.id }}</td>
          </tr>
          <tr>
            <td>Node ID</td>
            <td>{{ userDetails.node_id }}</td>
          </tr>
          <tr>
            <td>Type</td>
            <td>{{ userDetails.type }}</td>
          </tr>
          <tr>
            <td>URL</td>
            <td>{{ userDetails.url }}</td>
          </tr>
          <tr>
            <td>Repos URL</td>
            <td>{{ userDetails.repos_url }}</td>
          </tr>
          <tr>
            <td>Followers URL</td>
            <td>{{ userDetails.followers_url }}</td>
          </tr>
        </table>
      </div>
    </div>
  `,
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  username: string | null = null;
  userDetails: User | null = null;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.username = params['username'];
      this.apiService.getUserDetails(this.username!).subscribe((user) => {
        this.userDetails = user;
      });
    });
  }
}
