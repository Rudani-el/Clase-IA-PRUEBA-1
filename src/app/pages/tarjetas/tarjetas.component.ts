import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BottomNavComponent } from '../../shared/bottom-nav.component';

type Tipo = 'debito' | 'credito' | 'smart';
interface Tarjeta {
  tipo: Tipo; nombre: string; subtitulo: string; ultimos: string; titular?: string; expira?: string;
  marca?: string; congelada?: boolean; acciones: string[];
}

@Component({
  selector: 'app-tarjetas', standalone: true, imports: [CurrencyPipe, FormsModule, BottomNavComponent],
  templateUrl: './tarjetas.component.html', styleUrl: './tarjetas.component.css'
})
export class TarjetasComponent {
  filtro: 'todas' | Tipo = 'todas';
  bloqueoEmergencia = false;

  tarjetas: Tarjeta[] = [
    { tipo: 'debito', nombre: 'SIGNATURE', subtitulo: 'DÉBITO GLOBAL', ultimos: '4920', titular: 'RUBEN MENDOZA V.', expira: '08/28', marca: 'VISA', acciones: ['Ver CVV', 'Congelar', 'Límites'] },
    { tipo: 'credito', nombre: 'BLACK', subtitulo: 'CRÉDITO INTERNACIONAL', ultimos: '8831', titular: 'RUBEN MENDOZA V.', expira: '11/29', marca: 'Mastercard', acciones: ['Pagar Tarjeta', 'Movimientos', 'Ruben Club'] },
    { tipo: 'smart', nombre: 'RUBEN SMART SAVE', subtitulo: 'TARJETA VIRTUAL DE METAS', ultimos: '1054', acciones: ['Aportar Extra', 'Editar Meta', 'Reglas TEA'] }
  ];

  saldoDebito = 14850.5;
  credito = { disponible: 8420, total: 12000, cierre: '18 de Nov', minimo: 120 };
  meta = { acumulado: 5300, objetivo: 10000, aporte: 350, proximo: '01 Dic', tea: 6.5 };

  controles = [
    { titulo: 'Compras por Internet & Apps', desc: 'CVN dinámico y verificación RubenShield', on: true },
    { titulo: 'Uso en el Extranjero', desc: 'Bloquea cargos internacionales no presenciales', on: false },
    { titulo: 'Disposición de Efectivo (ATM)', desc: 'Retiros en cajeros de la red global y aliados', on: true }
  ];

  get lista(): Tarjeta[] { return this.filtro === 'todas' ? this.tarjetas : this.tarjetas.filter(t => t.tipo === this.filtro); }
  contar(t: Tipo): number { return this.tarjetas.filter(x => x.tipo === t).length; }
  get usado(): number { return Math.round(((this.credito.total - this.credito.disponible) / this.credito.total) * 1000) / 10; }
  get avanceMeta(): number { return Math.round((this.meta.acumulado / this.meta.objetivo) * 100); }

  accion(t: Tarjeta, a: string): void {
    if (a === 'Congelar') t.congelada = !t.congelada;
  }

  bloquear(): void {
    this.bloqueoEmergencia = true;
    this.tarjetas.forEach(t => (t.congelada = true));
  }
}
