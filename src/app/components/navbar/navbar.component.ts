import { Component, computed, HostListener, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from "@angular/animations"
import { MatDialog } from '@angular/material/dialog';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../services/cart/cart.service';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule, 
    MatIconModule, 
    MatMenuModule, 
    MatDividerModule, 
    CommonModule,
    MatBadgeModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger("navAnimation", [
      state(
        "inactive",
        style({
          transform: "translateY(-100%)",
        }),
      ),
      state(
        "active",
        style({
          transform: "translateY(0)",
        }),
      ),
      transition("inactive => active", animate("200ms ease-in")),
      transition("active => inactive", animate("200ms ease-out")),
    ]),
    trigger("menuAnimation", [
      state(
        "closed",
        style({
          opacity: 0,
          transform: "scaleY(0)",
          transformOrigin: "top",
        }),
      ),
      state(
        "open",
        style({
          opacity: 1,
          transform: "scaleY(1)",
          transformOrigin: "top",
        }),
      ),
      transition("closed => open", animate("200ms ease-out")),
      transition("open => closed", animate("200ms ease-in")),
    ]),
  ],
})

export class NavbarComponent {
  private dialog = inject(MatDialog)
  constructor(public auth: AuthService, public cartService: CartService) {}

  isLoggedIn = false;
  isMobileMenuOpen = false;
  lastScrollTop = 0;
  navbarState = "active";
  activeLink: string | null = null;
  username: string | null = null;
  cartItemCount = computed(() => this.cartService.getTotalQuantity())

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn;
    this.username = this.auth.identityClaims['sub'];
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    const st = window.pageYOffset || document.documentElement.scrollTop
    if (st > this.lastScrollTop && st > 100) {
      // Scroll down
      this.navbarState = "inactive"
    } else {
      // Scroll up
      this.navbarState = "active"
    }
    this.lastScrollTop = st <= 0 ? 0 : st
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    if (window.innerWidth > 768) {
      this.isMobileMenuOpen = false
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }

  setActiveLink(link: string): void {
    this.activeLink = link
  }

  clearActiveLink(): void {
    this.activeLink = null
  }

  login(): void {
    this.auth.login();
  }

  logout(): void {
    this.auth.logout();
  }

  openCart() {
    this.dialog.open(CartComponent, {
      width: "800px",
      maxWidth: "90vw",
      autoFocus: false,
    })
  }
  
}
