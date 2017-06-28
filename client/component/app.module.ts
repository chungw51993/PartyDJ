import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistItemComponent } from './playlist/playlist-item/playlist-item.component';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    PlaylistComponent,
    PlaylistItemComponent
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {

}
