import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BiometriaComponent } from './pages/biometria/biometria.component';
import { HuellaComponent } from './pages/huella/huella.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { OtpComponent } from './pages/otp/otp.component';
import { ContrasenaComponent } from './pages/contrasena/contrasena.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { TarjetasComponent } from './pages/tarjetas/tarjetas.component';
import { TransferenciasComponent } from './pages/transferencias/transferencias.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'biometria', component: BiometriaComponent },
  { path: 'huella', component: HuellaComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'otp', component: OtpComponent },
  { path: 'contrasena', component: ContrasenaComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'tarjetas', component: TarjetasComponent },
  { path: 'transferencias', component: TransferenciasComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: '**', redirectTo: 'login' }
];
