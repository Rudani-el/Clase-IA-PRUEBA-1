import { Component, ElementRef, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent implements OnDestroy {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  codigo: string[] = Array(6).fill('');
  segundos = 30;
  terminacion = '4821';
  errorCodigo = '';

  private readonly codigoPrueba = '482196';
  private timer?: ReturnType<typeof setInterval>;

  constructor(private router: Router) {
    const usuarioGuardado = sessionStorage.getItem('celular');
    if (usuarioGuardado) this.terminacion = usuarioGuardado.slice(-4);
    this.iniciarTimer();
  }

  get tiempo(): string {
    return `00:${String(this.segundos).padStart(2, '0')}`;
  }

  get completo(): boolean {
    return this.codigo.every(digito => /^\d$/.test(digito));
  }

  private iniciarTimer(): void {
    clearInterval(this.timer);
    this.segundos = 30;
    this.timer = setInterval(() => {
      if (this.segundos > 0) this.segundos--;
      else clearInterval(this.timer);
    }, 1000);
  }

  actualizarCodigo(event: Event, indice: number): void {
    const input = event.target as HTMLInputElement;
    const digitos = input.value.replace(/\D/g, '');
    this.errorCodigo = '';

    if (digitos.length > 1) {
      this.codigo = Array.from({ length: 6 }, (_, i) => digitos[i] ?? '');
      this.enfocar(Math.min(digitos.length, 5));
      return;
    }

    this.codigo[indice] = digitos.slice(-1);
    if (digitos && indice < 5) this.enfocar(indice + 1);
  }

  manejarTecla(event: KeyboardEvent, indice: number): void {
    if (event.key === 'Backspace' && !this.codigo[indice] && indice > 0) {
      this.codigo[indice - 1] = '';
      this.enfocar(indice - 1);
    } else if (event.key === 'ArrowLeft' && indice > 0) {
      this.enfocar(indice - 1);
    } else if (event.key === 'ArrowRight' && indice < 5) {
      this.enfocar(indice + 1);
    }
  }

  private enfocar(indice: number): void {
    setTimeout(() => this.otpInputs.get(indice)?.nativeElement.focus());
  }

  reenviar(): void {
    if (this.segundos > 0) return;
    this.codigo = Array(6).fill('');
    this.errorCodigo = '';
    this.iniciarTimer();
    this.enfocar(0);
  }

  validar(): void {
    if (!this.completo) return;
    if (this.codigo.join('') !== this.codigoPrueba) {
      this.errorCodigo = 'El código ingresado no es válido. Revisa e inténtalo nuevamente.';
      return;
    }

    this.router.navigate(['/contrasena']);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
