import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
      ipAddress: ['', [Validators.required, ipv4Validator]], // Applica il validatore personalizzato
      interval: [60, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.pingCheckForm.valid) {
      // Invia il valore del form al componente padre
      const pingCheckFormValue = this.pingCheckForm.value;
      pingCheckFormValue.interval *= 1000; // Converti i secondi in millisecondi
      this.dialogRef.close(pingCheckFormValue);
    }
  }

  onCancel(): void {
    // Chiudi la finestra di dialogo senza inviare il form
    this.dialogRef.close();
  }

  
}

function ipv4Validator(control: FormControl): { [key: string]: any } | null {
  const ipAddress = control.value;
  const ipv4Pattern =
    /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  if (ipAddress && !ipv4Pattern.test(ipAddress)) {
    return { invalidIpv4: true };
  }
  
  return null;
}