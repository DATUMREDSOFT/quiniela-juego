import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './pages/login/login.component';
import { JuegoApiService } from './services/juego-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JuegoComponent } from './pages/juego/juego.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GruposComponent } from './components/grupos/grupos.component';
import { PremiosComponent } from './pages/premios/premios.component';
import { PreguntasComponent } from './pages/preguntas/preguntas.component';
import { GrupoPreguntasComponent } from './components/grupo-preguntas/grupo-preguntas.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarHomeComponent } from './components/navbar-home/navbar-home.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { SingUpComponent } from './pages/sing-up/sing-up.component'
import { OrderModule } from 'ngx-order-pipe';
import { RankingComponent } from './pages/ranking/ranking.component';
import { FilterPipe } from './pipes/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    JuegoComponent,
    NavbarComponent,
    GruposComponent,
    PremiosComponent,
    PreguntasComponent,
    GrupoPreguntasComponent,
    HomeComponent,
    NavbarHomeComponent,
    SingUpComponent,
    RankingComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    OrderModule
  ],
  providers: [
    JuegoApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
