import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-huella',
  standalone: true,
  templateUrl: './huella.component.html',
  styleUrl: './huella.component.css'
})
export class HuellaComponent implements OnDestroy {
  readonly etapas = [1, 2, 3, 4, 5];
  capturas = 0;
  registrando = false;
  completado = false;
  private timer?: ReturnType<typeof setInterval>;
  private readonly correo = sessionStorage.getItem('ruben-current-user') ?? '';

  constructor(private router: Router) {
    if (!this.correo) this.router.navigate(['/login']);
  }

  iniciarRegistro(): void {
    if (this.registrando || this.completado) return;
    this.registrando = true;
    this.timer = setInterval(() => {
      this.capturas++;
      if (this.capturas >= 5) {
        this.capturas = 5;
        this.registrando = false;
        this.completado = true;
        clearInterval(this.timer);
      }
    }, 700);
  }

  activarHuella(): void {
    if (!this.completado || !this.correo) return;
    sessionStorage.setItem(this.claveHuella, 'true');
    this.router.navigate(['/inicio']);
  }

  omitir(): void {
    clearInterval(this.timer);
    if (this.correo) sessionStorage.setItem(this.claveHuella, 'false');
    this.router.navigate(['/inicio']);
  }

  private get claveHuella(): string {
    return `ruben-fingerprint-enabled:${this.correo}`;
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
