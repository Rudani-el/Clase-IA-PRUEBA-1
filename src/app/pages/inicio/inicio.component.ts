import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BottomNavComponent } from '../../shared/bottom-nav.component';

type Tipo = 'ingreso' | 'gasto' | 'servicio';
interface Movimiento { desc: string; monto: number; fecha: string; metodo: string; tipo: Tipo; }

@Component({
  selector: 'app-inicio', standalone: true, imports: [CurrencyPipe, RouterLink, BottomNavComponent],
  templateUrl: './inicio.component.html', styleUrl: './inicio.component.css'
})
export class InicioComponent {
  saldo = 14850.5;
  ocultar = false;
  token = '832 194';
  cci = '002-194-009492019-32';
  copiado = false;
  filtro: 'todos' | Tipo = 'todos';
  filtros = [
    { id: 'todos', label: 'Todos' }, { id: 'ingreso', label: 'Ingresos' },
    { id: 'gasto', label: 'Gastos' }, { id: 'servicio', label: 'Servicios' }
  ] as const;

  movimientos: Movimiento[] = [
    { desc: 'Depósito / Recarga de Saldo', monto: 1500, fecha: 'Hoy, 09:42 AM', metodo: 'Interbancaria', tipo: 'ingreso' },
    { desc: 'Supermercados Metro / Wong', monto: -245.8, fecha: 'Ayer, 07:15 PM', metodo: 'Tarjeta Débito', tipo: 'gasto' },
    { desc: 'Suscripción Netflix & Spotify', monto: -64.9, fecha: '18 Oct, 03:20 AM', metodo: 'Pago recurrente', tipo: 'servicio' },
    { desc: 'Abono de Nómina / Salario', monto: 4200, fecha: '15 Oct, 11:30 AM', metodo: 'Ruben S.A.', tipo: 'ingreso' },
    { desc: 'Pago de Servicio Luz del Sur', monto: -112.4, fecha: '14 Oct, 04:45 PM', metodo: 'Servicio básico', tipo: 'servicio' },
    { desc: 'Cafetería Starbucks Miraflores', monto: -28.5, fecha: '13 Oct, 08:30 AM', metodo: 'POS Ruben S.A.', tipo: 'gasto' }
  ];

  get lista(): Movimiento[] {
    return this.filtro === 'todos' ? this.movimientos : this.movimientos.filter(m => m.tipo === this.filtro);
  }

  copiar(): void {
    navigator.clipboard?.writeText(this.cci);
    this.copiado = true;
    setTimeout(() => (this.copiado = false), 1500);
  }
}
