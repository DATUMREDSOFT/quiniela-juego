import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { JuegoComponent } from './pages/juego/juego.component';
import { LoginComponent } from './pages/login/login.component';
import { PreguntasComponent } from './pages/preguntas/preguntas.component';
import { PremiosComponent } from './pages/premios/premios.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { SingUpComponent } from './pages/sing-up/sing-up.component';

const routes: Routes = [
  {   path: '', component: LoginComponent },
  { path: 'login/:id/:estado', component: LoginComponent },
  { path: 'sing-up/:id', component: SingUpComponent },
  { canActivate:[AuthGuard], path: 'home/:idParticipante', component: HomeComponent },
  { canActivate:[AuthGuard], path: 'juego/:idParticipante/:idQuiniela', component: JuegoComponent },
  { canActivate:[AuthGuard], path: 'premios/:idParticipante/:idQuiniela', component: PremiosComponent },
  { canActivate:[AuthGuard], path: 'ranking/:idParticipante/:idQuiniela', component: RankingComponent },
  { canActivate:[AuthGuard], path: 'preguntas/:idParticipante/:idQuiniela', component: PreguntasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
