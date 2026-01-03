import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterLinkWithHref } from "@angular/router";
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  constructor(private authService: AuthService){}
  router = inject(Router);
  
  logout() {
  this.authService.logout();
  this.router.navigate(['/login']);
}

}

