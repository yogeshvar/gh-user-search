import { Component } from '@angular/core';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [],
  template: `
    <section class="not-found-section">
      <div class="container">
        <h1>404 Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
      </div>
    </section>
  `,
  styleUrl: './notfound.component.css',
})
export class NotfoundComponent {}
