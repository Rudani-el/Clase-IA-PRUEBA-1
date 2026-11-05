import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario = '';
  contrasena = '';
  modoAcceso: 'password' | 'huella' = 'password';
  intentoEnvio = false;
  errorAcceso = '';

  private readonly correoDemo = 'demo@rubensa.com';
  private readonly contrasenaDemo = 'Demo123!';
  private readonly formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private readonly formatoContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

  constructor(private router: Router) {}

  get mostrarErrorUsuario(): boolean {
    return this.intentoEnvio && !this.formatoCorreo.test(this.usuario.trim());
  }

  get mostrarErrorContrasena(): boolean {
    return this.intentoEnvio && !this.formatoContrasena.test(this.contrasena);
  }

  get huellaDisponible(): boolean {
    const correo = this.usuario.trim().toLowerCase();
    try {
      return !!correo && sessionStorage.getItem(`ruben-fingerprint-enabled:${correo}`) === 'true';
    } catch {
      return false;
    }
  }

  actualizarUsuario(): void {
    this.limpiarEstado();
    if (!this.huellaDisponible) this.modoAcceso = 'password';
  }

  seleccionarModo(modo: 'password' | 'huella'): void {
    this.modoAcceso = modo;
    this.limpiarEstado();
  }

  ingresarConHuella(): void {
    this.errorAcceso = '';
    const correo = this.usuario.trim().toLowerCase();
    if (!this.huellaDisponible) {
      this.errorAcceso = 'El acceso con huella no está activado para este usuario.';
      return;
    }

    try {
      const registrados = JSON.parse(sessionStorage.getItem('ruben-demo-users') ?? '[]') as Array<{ correo: string }>;
      if (!registrados.some(usuario => usuario.correo === correo)) {
        this.errorAcceso = 'No se encontró una cuenta registrada para este correo.';
        return;
      }
      this.router.navigate(['/inicio']);
    } catch {
      this.errorAcceso = 'No se pudo validar la huella de demostración.';
    }
  }

  limpiarEstado(): void {
    this.errorAcceso = '';
  }

  ingresar(): void {
    this.intentoEnvio = true;
    this.errorAcceso = '';

    if (this.mostrarErrorUsuario || this.mostrarErrorContrasena) return;

    const correo = this.usuario.trim().toLowerCase();
    let credencialesValidas = correo === this.correoDemo && this.contrasena === this.contrasenaDemo;

    try {
      const registrados = JSON.parse(sessionStorage.getItem('ruben-demo-users') ?? '[]') as Array<{ correo: string; contrasena: string }>;
      credencialesValidas ||= registrados.some(usuario => usuario.correo === correo && usuario.contrasena === this.contrasena);
    } catch {
      // Keep the built-in test account available if the browser session data is unavailable.
    }

    if (!credencialesValidas) {
      this.errorAcceso = 'Usuario o contraseña incorrectos. Usa el acceso de prueba para ingresar.';
      return;
    }

    this.router.navigate(['/inicio']);
  }
}
