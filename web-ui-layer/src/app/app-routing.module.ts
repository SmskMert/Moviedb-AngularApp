import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { HomeComponent } from './home/home.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MovieUpdateComponent } from './movie-update/movie-update.component';


const routes: Routes = [
  {path: 'movie-update/:id', component:MovieUpdateComponent},
  {path: 'movie-create', component:MovieCreateComponent},
  {path: 'home', component:HomeComponent},
  {path: 'movies', component:MoviesComponent},
  {path: '', redirectTo:'home',pathMatch:'full'},
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],


  exports: [RouterModule]
})
export class AppRoutingModule { }
