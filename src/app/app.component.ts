import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, RouterModule],
  template: `
    <main>
      <section class="container">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'practice';
}
