import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface Ubicacion {
  nombre: string;
  direccion: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-ubicaciones',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, MatCardModule, MatIconModule],
  templateUrl: './ubicaciones.component.html',
})
export class UbicacionesComponent {
  zoom = 12;
  center: google.maps.LatLngLiteral = { lat: -33.4372, lng: -70.6506 }; // Centro Santiago
  ubicaciones: Ubicacion[] = [
    {
      nombre: 'Sandwich Planet Providencia',
      direccion: 'Av. Nueva Providencia 2200, Providencia',
      lat: -33.417905, lng: -70.605747
    },
    {
      nombre: 'Sandwich Planet Barrio Italia',
      direccion: 'Av. Italia 1029, Ñuñoa',
      lat: -33.445569, lng: -70.623382
    },
    {
      nombre: 'Sandwich Planet Las Condes',
      direccion: 'Av. Apoquindo 3885, Las Condes',
      lat: -33.414577, lng: -70.573518
    }
  ];
  selectedUbicacion = this.ubicaciones[0];

  selectUbicacion(ubicacion: Ubicacion) {
    this.selectedUbicacion = ubicacion;
    this.center = { lat: ubicacion.lat, lng: ubicacion.lng };
  }
}
