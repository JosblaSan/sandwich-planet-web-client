import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { SandwichListComponent } from './sandwich-list/sandwich-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent,RouterOutlet, CommonModule],
  template: `
    <router-outlet></router-outlet>
  `,
  templateUrl: './app.component.html',
  styles: [],
  styleUrl: './app.component.scss'
})
export class AppComponent {

  

  title = 'sandwich-planet-web-client';
  
}
