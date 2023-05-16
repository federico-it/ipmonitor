import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-ping-check-dialog',
  templateUrl: './delete-ping-check-dialog.component.html',
  styleUrls: ['./delete-ping-check-dialog.component.css']
})
export class DeletePingCheckDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeletePingCheckDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  confirmDelete(): void {
    // Chiudi la finestra di dialogo confermando l'eliminazione
    this.dialogRef.close('delete');
  }

  cancel(): void {
    // Chiudi la finestra di dialogo senza eliminare
    this.dialogRef.close();
  }

}
