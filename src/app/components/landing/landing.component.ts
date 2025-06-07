import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { SandwichControllerService, SandwichResumenDTO } from '../../services/sandwich-client';
import { CommonModule } from '@angular/common';
import { SandwichListComponent } from "../../sandwich-list/sandwich-list.component";

@Component({
  selector: 'app-landing',
  imports: [ProductCardComponent, CommonModule, SandwichListComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {

  sandwiches: SandwichResumenDTO[] = [];

  constructor(private sandwichService: SandwichControllerService){

  }

  ngOnInit(): void {
    this.sandwichService.listarResumen('body', false, {
      httpHeaderAccept: 'application/json',
    }).subscribe(sandwiches => {
      this.sandwiches = sandwiches;
    });
  }

}
