import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
  <nav class="nav" aria-label="Navegación principal">
    @if (masAbierto) {
      <div class="more-menu" role="menu">
        <a routerLink="/inicio" role="menuitem" (click)="masAbierto = false">↩ <span>Volver al inicio</span></a>
        <button type="button" role="menuitem" (click)="cerrarSesion()">⏻ <span>Cerrar sesión</span></button>
      </div>
    }
    <a routerLink="/inicio" routerLinkActive="on">⌂<span>Inicio</span></a>
    <a routerLink="/transferencias" routerLinkActive="on">⇄<span>Transferir</span></a>
    <a routerLink="/tarjetas" routerLinkActive="on">▣<span>Tarjetas</span></a>
    <a routerLink="/servicios" routerLinkActive="on">▤<span>Servicios</span></a>
    <button class="more-trigger" type="button" [class.on]="masAbierto" [attr.aria-expanded]="masAbierto" (click)="masAbierto = !masAbierto">
      ☰<span>Más</span>
    </button>
  </nav>`,
  styles: [`
    .nav{position:fixed;z-index:20;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:440px;background:#fff;
      display:flex;justify-content:space-around;align-items:center;padding:10px 0 14px;box-shadow:0 -4px 20px rgba(11,35,64,.08);border-radius:20px 20px 0 0}
    .nav>a,.more-trigger{display:flex;flex-direction:column;align-items:center;justify-content:center;min-width:54px;font-size:18px;color:var(--muted);text-decoration:none;cursor:pointer}
    .more-trigger{padding:0;border:0;background:transparent;font-family:inherit}
    .nav span{font-size:11px;font-weight:600;margin-top:2px}
    .nav>a.on,.more-trigger.on{color:var(--blue)}
    .more-menu{position:absolute;right:12px;bottom:calc(100% + 8px);width:208px;padding:7px;border:1px solid #e5eaf2;border-radius:14px;background:#fff;box-shadow:0 8px 24px rgba(11,35,64,.16)}
    .more-menu a,.more-menu button{display:flex;align-items:center;gap:10px;width:100%;padding:12px;border:0;border-radius:9px;background:#fff;color:var(--navy);font:inherit;font-size:14px;text-align:left;text-decoration:none;cursor:pointer}
    .more-menu a:hover,.more-menu button:hover{background:#f0f4fb;color:var(--blue)}
    .more-menu span{margin:0;font-size:14px}
  `]
})
export class BottomNavComponent {
  masAbierto = false;

  constructor(private router: Router) {}

  cerrarSesion(): void {
    sessionStorage.removeItem('ruben-current-user');
    sessionStorage.removeItem('ruben-pending-user');
    this.masAbierto = false;
    this.router.navigate(['/login']);
  }
}
