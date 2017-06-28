import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <h1 class="title">PartyDJ</h1>
    <nav>
      <a routerLink="/playlist">Playlist</a>
    </nav>
    <router-outlet></router-outlet>
   `
})

export class AppComponent {

}