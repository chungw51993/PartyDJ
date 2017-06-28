import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistItemComponent } from './playlist/playlist-item/playlist-item.component';
import { LoginComponent } from './login.component';
import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    PlaylistComponent,
    PlaylistItemComponent,
    LoginComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {

}
