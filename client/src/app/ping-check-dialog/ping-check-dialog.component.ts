import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ping-check-dialog',
  templateUrl: './ping-check-dialog.component.html',
  styleUrls: ['./ping-check-dialog.component.css']
})
export class PingCheckDialogComponent implements OnInit {
  pingCheckForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<PingCheckDialogComponent>) { }

  ngOnInit(): void {
    this.pingCheckForm = this.formBuilder.group({
      ipAddress: ['', Validators.required],
      interval: [5000, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.pingCheckForm.valid) {
      // Invia il valore del form al componente padre
      this.dialogRef.close(this.pingCheckForm.value);
    }
  }

  onCancel(): void {
    // Chiudi la finestra di dialogo senza inviare il form
    this.dialogRef.close();
  }
}
