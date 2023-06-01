import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { MoviesComponent } from './movies/movies.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import {InMemoryMovieDataService} from './in-memory-movie-data.service';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { HomeComponent } from './home/home.component';
import { MovieCreateComponent } from './movie-create/movie-create.component'
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MovieUpdateComponent } from './movie-update/movie-update.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    MoviesComponent,
    MovieDetailsComponent,
    HomeComponent,
    MovieCreateComponent,
    MovieUpdateComponent
  ],
  imports: [
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryMovieDataService, {dataEncapsulation:false, delay: 1000 }
      ),
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
