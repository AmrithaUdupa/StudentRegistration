import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // Updated import
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './sharepage/layout/layout/layout.component';
import { NavbarComponent } from './sharepage/navbar/navbar.component';
import { AuthService } from './auth.service';
import { authGuard } from './service/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    LayoutComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    provideHttpClient(withInterceptorsFromDi()) // Updated provider configuration
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
