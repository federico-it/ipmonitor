import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  currentUser: any;
  currentName: any;
  currentMail: any;

  constructor(private authService: AuthService, public dialog: MatDialog, public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.authService.getUserProfileToken().subscribe(
      (data) => {
        this.currentUser = data.user;
        this.currentName = data.name;
        this.currentMail = data.email;
      },
      (error) => {
        console.error(error);
        // Gestisci l'errore
      }
    );
  }

  openEditProfileDialog() {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '400px',
      data: {
        name: this.currentName,
        email: this.currentMail,
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const updatedProfile = {
          name: result.name,
          email: result.email,
        };
  
        this.authService.updateUserProfile(updatedProfile).subscribe(
          (data) => {
            // Aggiorna le informazioni visualizzate dopo l'aggiornamento del profilo
            this.currentName = data.user.name;
            this.currentMail = data.user.email;
          },
          (error) => {
            console.error(error);
            // Gestisci l'errore durante l'aggiornamento del profilo
          }
        );
      }
    });
  }

  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '400px',
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const updatedProfile = {
          password: result.newPassword,
        };
  
        this.authService.verifyPassword(result.currentPassword).subscribe(
          (response) => {
            if (response.isPasswordCorrect == true) {
              // La password corrente è stata verificata con successo
              // Puoi procedere con il cambio della password
              this.authService.updateUserProfile(updatedProfile).subscribe(
                () => {
                  this.snackBar.open('Password changed correctly.', 'Close', {
                    duration: 3000,
                  });
                  // La password è stata cambiata con successo
                  // Puoi gestire l'output o mostrare un messaggio di successo
                },
                (error) => {
                  console.error(error);
                  // Gestisci l'errore durante il cambio della password
                  this.snackBar.open('An error occurred while changing your password.', 'Close', {
                    duration: 3000,
                  });
                }
              );
            } else {
              // La password corrente non è valida
              this.snackBar.open('The current password is not valid.', 'Close', {
                duration: 3000,
              });
            }
          },
          (error) => {
            console.error(error);
            // Gestisci l'errore della verifica della password
            this.snackBar.open('An error occurred while verifying your password.', 'Close', {
              duration: 3000,
            });
          }
        );
      }
    });
  }
  
  
}
