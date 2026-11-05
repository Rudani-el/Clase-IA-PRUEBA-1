import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BottomNavComponent } from '../../shared/bottom-nav.component';

interface Banco { sigla: string; nombre: string; estado: string; inmediato: boolean; detalle: string; }

@Component({
  selector: 'app-transferencias', standalone: true, imports: [CurrencyPipe, FormsModule, BottomNavComponent],
  templateUrl: './transferencias.component.html', styleUrl: './transferencias.component.css'
})
export class TransferenciasComponent {
  saldo = 14850.5;
  busqueda = '';
  opcionSel = 0;
  bancoSel?: Banco;
  contactos = ['Rubén M.', 'Sofía L.', 'Carlos V.', 'Mamá'];

  opciones = [
    { titulo: 'A cuentas Ruben S.A.', tag: 'GRATIS • 0S', desc: 'Instantáneas entre clientes Ruben S.A.', icon: '🏦' },
    { titulo: 'Otros Bancos (CCI)', tag: 'INTERBANCARIO', desc: 'Inmediatas 24/7 o diferidas interbancarias.', icon: '🔁' },
    { titulo: 'Celular & Billeteras', tag: 'POR TELÉFONO / QR', desc: 'Envío rápido con número móvil o código QR.', icon: '📱' },
    { titulo: 'Al Exterior (SWIFT)', tag: 'INTERNACIONAL', desc: 'Transferencias globales en USD y EUR.', icon: '🌎' }
  ];

  bancos: Banco[] = [
    { sigla: 'BCP', nombre: 'Banco de Crédito (BCP)', estado: 'Inmediata 24/7', inmediato: true, detalle: 'Soles y Dólares' },
    { sigla: 'BBVA', nombre: 'BBVA Perú', estado: 'Inmediata 24/7', inmediato: true, detalle: 'CCI Válido' },
    { sigla: 'IBK', nombre: 'Interbank', estado: 'Inmediata 24/7', inmediato: true, detalle: 'Plin integrado' },
    { sigla: 'BNS', nombre: 'Scotiabank', estado: 'Inmediata 24/7', inmediato: true, detalle: 'Todas las cuentas' },
    { sigla: 'BN', nombre: 'Banco de la Nación', estado: 'Diferido / Horario', inmediato: false, detalle: 'Cuentas Corrientes' },
    { sigla: 'BIF', nombre: 'BanBif', estado: 'Inmediata 24/7', inmediato: true, detalle: 'CCI' },
    { sigla: 'BP', nombre: 'Banco Pichincha', estado: 'Inmediata', inmediato: true, detalle: 'Cuentas Ahorro' },
    { sigla: 'BF', nombre: 'Falabella / Ripley', estado: 'Inmediata', inmediato: true, detalle: 'Tarjetas y Débito' },
    { sigla: 'GNB', nombre: 'GNB / Santander', estado: 'Inmediata', inmediato: true, detalle: 'Operaciones CCI' },
    { sigla: 'CM', nombre: 'Cajas Municipales (Arequipa, Cusco...)', estado: 'Red Cajas 24/7', inmediato: true, detalle: '+12 Cajas afiliadas' }
  ];

  get filtrados(): Banco[] {
    const q = this.busqueda.trim().toLowerCase();
    return q ? this.bancos.filter(b => (b.nombre + b.sigla).toLowerCase().includes(q)) : this.bancos;
  }

  iniciales(n: string): string { return n.split(' ').map(p => p[0]).join('').slice(0, 2); }
}
