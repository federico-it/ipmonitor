import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent {
  passwordForm: FormGroup;
  passwordVisibility: { [key: string]: boolean } = {
    currentPassword: true,
    newPassword: true
  }

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]],
    });
  }

  togglePasswordVisibility(field: string): void {
    this.passwordVisibility[field] = !this.passwordVisibility[field];
  }

  onChangePassword(): void {
    if (this.passwordForm.valid) {
      const currentPassword = this.passwordForm.value.currentPassword;
      const newPassword = this.passwordForm.value.newPassword;

      if (currentPassword === newPassword) {
        this.snackBar.open('The new password cannot be the same as the current password', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      } else {
        this.dialogRef.close(this.passwordForm.value);
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
