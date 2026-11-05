import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface DemoUser {
  nombreUsuario: string;
  celular: string;
  correo: string;
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  nombreUsuario = '';
  celular = '';
  correo = '';
  intentoEnvio = false;
  errorRegistro = '';

  private readonly formatoUsuario = /^[A-Za-z0-9][A-Za-z0-9._-]{2,19}$/;
  private readonly formatoCelular = /^\d{10}$/;
  private readonly formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(private router: Router) {}

  get usuarioOk(): boolean {
    return this.formatoUsuario.test(this.nombreUsuario.trim());
  }

  get celularOk(): boolean {
    return this.formatoCelular.test(this.celular.replace(/\s/g, ''));
  }

  get correoOk(): boolean {
    return this.formatoCorreo.test(this.correo.trim());
  }

  get mostrarErrorUsuario(): boolean { return this.intentoEnvio && !this.usuarioOk; }
  get mostrarErrorCelular(): boolean { return this.intentoEnvio && !this.celularOk; }
  get mostrarErrorCorreo(): boolean { return this.intentoEnvio && !this.correoOk; }

  limpiarEstado(): void {
    this.errorRegistro = '';
  }

  registrar(): void {
    this.intentoEnvio = true;
    this.errorRegistro = '';
    if (!this.usuarioOk || !this.celularOk || !this.correoOk) return;

    const usuario: DemoUser = {
      nombreUsuario: this.nombreUsuario.trim(),
      celular: this.celular.replace(/\s/g, ''),
      correo: this.correo.trim().toLowerCase()
    };

    try {
      const guardados = JSON.parse(sessionStorage.getItem('ruben-demo-users') ?? '[]') as DemoUser[];
      if (guardados.some(registrado => registrado.correo === usuario.correo || registrado.nombreUsuario.toLowerCase() === usuario.nombreUsuario.toLowerCase())) {
        this.errorRegistro = 'Ese nombre de usuario o correo ya está registrado en esta sesión.';
        return;
      }
      sessionStorage.setItem('ruben-pending-user', JSON.stringify(usuario));
      sessionStorage.setItem('celular', usuario.celular);
      this.router.navigate(['/otp']);
    } catch {
      this.errorRegistro = 'No se pudo completar el registro. Inténtalo nuevamente.';
    }
  }
}
