import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BottomNavComponent } from '../../shared/bottom-nav.component';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [RouterLink, BottomNavComponent],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {}
