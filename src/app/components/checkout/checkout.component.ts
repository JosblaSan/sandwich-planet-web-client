import { Component, OnInit } from '@angular/core';
import { MercadoPagoControllerService } from '../../services/sandwich-client/api/mercadoPagoController.service';
import { Item } from '../../services/sandwich-client/model/item';
import { PreferenceRequestDTo } from '../../services/sandwich-client/model/preferenceRequestDTo';
import { CartService } from '../../services/cart/cart.service';
declare const MercadoPago: any;

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  preferenceId: string = '';
  mp: any;

  constructor(
    private mercadoPagoService: MercadoPagoControllerService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {

    const cartItems = this.cartService.getCartItemsArray();
    let preferenciaRequest: PreferenceRequestDTo = {
      items: []
    };

    cartItems.forEach((item) => {
      const preferencia: Item = {
        title: item.product.nombre,
        unit_price: item.product.precio,
        quantity: item.quantity,
        currency_id: 'CLP',
      };

      preferenciaRequest.items!.push(preferencia);
    });


    this.mercadoPagoService.crearPreferencia(preferenciaRequest)
      .subscribe((response: any) => {
        this.preferenceId = response.preference_id;

        const publicKey = "APP_USR-861e106b-d919-4f89-8380-ed091a3a7be5";
        const preferenceId = this.preferenceId;

        // Inicializa o SDK do Mercado Pago
        const mp = new MercadoPago(publicKey);

        // Cria o botão de pagamento
        const bricksBuilder = mp.bricks();
        const renderWalletBrick = async (bricksBuilder: any) => {
          await bricksBuilder.create("wallet", "walletBrick_container", {
            initialization: {
              preferenceId: preferenceId,
            }
          });
        };

        renderWalletBrick(bricksBuilder);
      });
  }
}
