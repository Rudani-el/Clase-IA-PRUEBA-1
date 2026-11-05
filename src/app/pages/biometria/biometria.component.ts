import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-biometria',
  standalone: true,
  templateUrl: './biometria.component.html',
  styleUrl: './biometria.component.css'
})
export class BiometriaComponent implements OnInit, OnDestroy {
  progreso = 0;
  verificando = false;
  verificado = false;
  private correo = '';
  private timer?: ReturnType<typeof setInterval>;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.correo = sessionStorage.getItem('ruben-current-user') ?? '';
    if (!this.correo) {
      this.router.navigate(['/login']);
      return;
    }

    this.verificado = sessionStorage.getItem(this.claveVerificacion) === 'true';
    if (this.verificado) this.router.navigate(['/huella']);
  }

  private get claveVerificacion(): string {
    return `ruben-face-verified:${this.correo}`;
  }

  iniciarVerificacion(): void {
    if (this.verificando || this.verificado) return;
    this.verificando = true;
    this.timer = setInterval(() => {
      this.progreso = Math.min(100, this.progreso + 5);
      if (this.progreso === 100) {
        clearInterval(this.timer);
        this.verificando = false;
        this.verificado = true;
        sessionStorage.setItem(this.claveVerificacion, 'true');
      }
    }, 120);
  }

  continuar(): void {
    if (this.verificado) this.router.navigate(['/huella']);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
