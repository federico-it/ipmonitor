import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  hidePassword: boolean = true;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$')
        ]
      ]
    });
  }

  get name() {
    return this.registrationForm.get('name');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  submitForm() {
    if (this.registrationForm.invalid) {
      return;
    }

    const registrationData = this.registrationForm.value;
    // Esegui la chiamata API per la registrazione dell'utente
    this.authService.signUp(registrationData).subscribe(
      (res) => {
        this.registrationForm.reset();
        this.router.navigate(['/login']);
      },
      (error: HttpErrorResponse) => {
          this.snackBar.open("User already exists", 'Close', {
            duration: 5000
          });
      }
    );
  }
}
