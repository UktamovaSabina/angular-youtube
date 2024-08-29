import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { User } from '../../user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router, private apiService: ApiService, private fb: FormBuilder) { }

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  logIn() {
    const users = this.apiService.getItem("users");
    const { username, password } = this.loginForm.value

    if (users) {
      const user = users.find((u: User) => u.username.toLowerCase() === username.toLowerCase() && u.password.toLowerCase() === password.toLowerCase())
      if (user) {
        this.apiService.setItem("user", JSON.stringify(user));
        this.router.navigate(['/']);
      } else {
        alert("Username or password is wrong");
        this.loginForm.setValue({
          username: '',
          password: '',
        })
      }
    } else {
      alert("You should register!")
      this.router.navigate(['register'])
    }
  }
}
