import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private router: Router
  ) {}

  canActivate(): boolean {
  if (localStorage.getItem('isLoggedIn') === 'true') {
    return true;
  }

  this.router.navigate(['/login']);
  return false;
}

}
