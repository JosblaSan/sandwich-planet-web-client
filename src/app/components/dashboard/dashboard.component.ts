import { Component, OnInit } from '@angular/core';
import { TipoDto, OrigenDTO, IngredienteDTo, SandwichControllerService, SandwichesMetadataDTO } from '../../services/sandwich-client';
import { SandwichListComponent } from "../sandwich-list/sandwich-list.component";
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [SandwichListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  tipos: TipoDto[] = [];
  paises: OrigenDTO[] = [];
  ingredientes: IngredienteDTo[] = [];
  sandwiches: SandwichesMetadataDTO = { sandwiches: [], metadata: {} };

  constructor(
    private sandwichService: SandwichControllerService,
    private authService: AuthService 
  ) {

  }
  ngOnInit(): void {
    this.authService.verificarRol('/dashboard', ['ROLE_admin']);
    this.sandwichService.listarSandwiches().subscribe(data => this.sandwiches = data);
  }

}
