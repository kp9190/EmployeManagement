import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginObj = {
    username: '',
    password: ''
  };

  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onLogin() {
    this.errorMessage = '';

    // 🔹 Validation
    if (!this.loginObj.username.trim()) {
      this.errorMessage = 'Username is required';
      return;
    }

    if (!this.loginObj.password.trim()) {
      this.errorMessage = 'Password is required';
      return;
    }

    this.isLoading = true;

    // 🔹 Simulate API call
    setTimeout(() => {
      this.isLoading = false;

      const success = this.authService.login(
        this.loginObj.username,
        this.loginObj.password
      );

      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    }, 1200);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
