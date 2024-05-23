import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { SharedModule } from './shared.module';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(SharedModule),
    provideRouter([
      { path: 'home', component: HomeComponent },
      { path: '', component: LoginComponent },
      // Adicione outras rotas conforme necessário
    ]), provideAnimationsAsync()
  ]
};
