import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CastComponent } from './components/cast/cast.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MoviesComponent } from './components/movies/movies.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: "", component: LoginComponent },

  { path: "home", component: HomeComponent, children: [
    {path:"movies", component: MoviesComponent},
    {path:"cast",component:CastComponent},
    {path:"details/:id",component:MovieDetailComponent}
  ] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
