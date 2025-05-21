import { Component, Input } from '@angular/core';
import { SandwichResumenDTO } from '../../services/sandwich-client/model/sandwichResumenDTO';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatBadgeModule } from "@angular/material/badge";
import { MatTooltipModule } from "@angular/material/tooltip";


@Component({
  selector: 'app-product-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatTooltipModule,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input()
  sandwich: SandwichResumenDTO | undefined;

  constructor() {}

}
