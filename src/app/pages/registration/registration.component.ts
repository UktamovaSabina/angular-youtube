import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../../user';
import { ApiService } from '../../services/api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  constructor(private apiService: ApiService, private router: Router, private fb: FormBuilder) {
  }

  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    lastname: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, this.validateEmail]]
  })

  validateEmail(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    if (email && typeof email === 'string') {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|email\.com)$/;
      const valid = emailPattern.test(email);
      return valid ? null : { 'invalidEmail': true };
    }
    return null;
  }

  signUp() {
    const { username } = this.registerForm.value
    console.log();

    const data: [User] | null = this.apiService.getItem('users')
    if (data) {
      if (data.find((d: User) => d.username.toLowerCase() === username.toLowerCase())) {
        alert(`this username "${username}" already exists!`);
        this.registerForm.patchValue({
          username: '',
        })
        return;
      } else {
        data.push(this.registerForm.value)
        this.apiService.setItem('users', JSON.stringify(data));
        this.apiService.setItem('user', JSON.stringify(this.registerForm.value));
        this.router.navigate(['/'])
      }
    } else {
      this.apiService.setItem('users', JSON.stringify([this.registerForm.value]))
      this.apiService.setItem('user', JSON.stringify(this.registerForm.value))
      this.router.navigate(['/'])
    }
  }
}
