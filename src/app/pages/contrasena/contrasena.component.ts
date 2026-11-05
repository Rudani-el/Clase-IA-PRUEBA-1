import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface DemoUser {
  nombreUsuario: string;
  celular: string;
  correo: string;
}

@Component({
  selector: 'app-contrasena',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contrasena.component.html',
  styleUrl: './contrasena.component.css'
})
export class ContrasenaComponent {
  clave = '';
  confirmar = '';
  errorCreacion = '';

  constructor(private router: Router) {}

  get reglas() {
    return [
      { texto: 'Al menos 8 caracteres y letras (A-Z, a-z)', ok: this.clave.length >= 8 && /[A-Z]/.test(this.clave) && /[a-z]/.test(this.clave) },
      { texto: 'Al menos un número (0-9)', ok: /\d/.test(this.clave) },
      { texto: 'Al menos un guion (-)', ok: /-/.test(this.clave) },
      { texto: 'Ambas contraseñas coinciden', ok: !!this.confirmar && this.clave === this.confirmar }
    ];
  }

  get valido(): boolean {
    return this.reglas.every(regla => regla.ok);
  }

  crear(): void {
    if (!this.valido) return;
    this.errorCreacion = '';

    try {
      const pendiente = sessionStorage.getItem('ruben-pending-user');
      if (pendiente) {
        const usuario = { ...(JSON.parse(pendiente) as DemoUser), contrasena: this.clave };
        const registrados = JSON.parse(sessionStorage.getItem('ruben-demo-users') ?? '[]') as DemoUser[];
        sessionStorage.setItem('ruben-demo-users', JSON.stringify([...registrados, usuario]));
        sessionStorage.removeItem('ruben-pending-user');
        sessionStorage.setItem('ruben-current-user', usuario.correo);
        this.router.navigate(['/biometria']);
        return;
      }
      this.router.navigate(['/inicio']);
    } catch {
      this.errorCreacion = 'No se pudo guardar la contraseña. Inténtalo nuevamente.';
    }
  }
}
