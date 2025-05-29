import { Component } from '@angular/core';
import { SandwichComponent } from "../../sandwich/sandwich.component";

@Component({
  selector: 'app-landing',
  imports: [SandwichComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
