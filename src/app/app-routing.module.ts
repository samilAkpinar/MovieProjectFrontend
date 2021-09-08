import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CastComponent } from './components/cast/cast.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MoviesComponent } from './components/movies/movies.component';
import { ForgottenPasswordComponent } from './pages/forgotten-password/forgotten-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: "", component: LoginComponent },

  { path: "home", component: HomeComponent, children: [
    {path:"movies", component: MoviesComponent},
    {path:"cast",component:CastComponent},
    {path:"details/:id",component:MovieDetailComponent}
  ] },

  {path: "reset/:email/:verify", component: ForgottenPasswordComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**',redirectTo: '404' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
