import { NgModule, Pipe } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ImageComponent } from './components/image/image.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoviesComponent } from './components/movies/movies.component';
import { CastComponent } from './components/cast/cast.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ForgottenPasswordComponent } from './pages/forgotten-password/forgotten-password.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { CastDetailComponent } from './components/cast-detail/cast-detail.component';
import { SafePipe } from './safe.pipe';

import { JwPaginationModule } from 'jw-angular-pagination';
import { NgxPaginationModule} from 'ngx-pagination';

import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';


// For MDB Angular Free
import { NavbarModule, WavesModule } from 'angular-bootstrap-md'
import { FormService } from './services/form.service';
import { AuthGuard } from './auth.guard';
import { LoginFormsComponent } from './partial/login-forms/login-forms.component';
import { PasswordForgottenFormsComponent } from './partial/password-forgotten-forms/password-forgotten-forms.component';
import { SignupFormsComponent } from './partial/signup-forms/signup-forms.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ImageComponent,
    InputComponent,
    ButtonComponent,
    HomeComponent,
    SidebarComponent,
    HeaderComponent,
    MoviesComponent,
    CastComponent,
    MovieDetailComponent,
    ForgottenPasswordComponent,
    NotFoundComponent,
    WelcomeComponent,
    CastDetailComponent,
    SafePipe,
    LoginFormsComponent,
    PasswordForgottenFormsComponent,
    SignupFormsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressBarModule,
    JwPaginationModule,
    NgxPaginationModule,
    MatIconModule,
    MatToolbarModule,
    NavbarModule, 
    WavesModule,
    FormsModule
  ],
  providers: [
    FormService, AuthGuard,
    {
      provide: 'apiUrl',
      //localhost
      //useValue: 'https://localhost:5001/api/v1'
      
      //freasphosting.com
      useValue: 'https://bsite.net/samil/api/v1'

      //somee.com
      //useValue:'https://www.trailer-movie.somee.com/api/v1' 

      //azure
      //useValue: 'https://movieproject20211028113058.azurewebsites.net/api/v1'
    },
    {
      provide:"tokenValue",
      useValue: localStorage.getItem("jwt-token")
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
