import { Component, Input } from '@angular/core';
import { User } from '../user';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="user-list">
      <img
        class="user-list-photo"
        [src]="user.avatar_url"
        alt="Exterior photo of {{ user.id }}"
      />
      <h2 class="user-list-heading">{{ user.login }}</h2>
      <p class="user-list-repo">
        <a href="{{ user.html_url }}" target="_blank">Profile</a>
        <a [routerLink]="['/details', user.login]"
          >Learn More About {{ user.login }}</a
        >
      </p>
    </section>
  `,
  styleUrl: './user.component.css',
})
export class UserComponent {
  @Input() user!: User;
}
