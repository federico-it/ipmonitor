import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.css']
})
export class EditProfileDialogComponent {
  profileForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.profileForm = this.formBuilder.group({
      name: [data.name, Validators.required],
      email: [data.email, [Validators.required, this.customEmailValidator]]
    });
  }

  onSave(): void {
    if (this.profileForm.valid) {
      // Chiudi la finestra di dialogo e restituisci i valori modificati al componente padre
      this.dialogRef.close(this.profileForm.value);
    } else {
      // Form non valido, esegui azioni aggiuntive o mostra messaggi di errore
    }
  }

  onCancel(): void {
    // Chiudi la finestra di dialogo senza salvare le modifiche
    this.dialogRef.close();
  }

  customEmailValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : { invalidEmail: true };
  }
}
