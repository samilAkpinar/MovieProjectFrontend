import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ImageComponent } from './components/image/image.component';
import { LoginFormComponent } from './partial/login-form/login-form.component';
import { InputComponent } from './components/input/input.component';
import { PasswordForgottenComponent } from './partial/password-forgotten/password-forgotten.component';
import { ResetPasswordButtonComponent } from './partial/reset-password-button/reset-password-button.component';
import { ButtonComponent } from './components/button/button.component';
import { LoginButtonComponent } from './partial/login-button/login-button.component';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchInputComponent } from './partial/search-input/search-input.component';
import { MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoviesComponent } from './components/movies/movies.component';
import { CastComponent } from './components/cast/cast.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SignupButtonComponent } from './partial/signup-button/signup-button.component';
import { SignupFormComponent } from './partial/signup-form/signup-form.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ImageComponent,
    LoginFormComponent,
    InputComponent,
    PasswordForgottenComponent,
    ResetPasswordButtonComponent,
    ButtonComponent,
    LoginButtonComponent,
    HomeComponent,
    SidebarComponent,
    HeaderComponent,
    MoviesComponent,
    CastComponent,
    SearchInputComponent,
    MovieDetailComponent,
    SignupButtonComponent,
    SignupFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
