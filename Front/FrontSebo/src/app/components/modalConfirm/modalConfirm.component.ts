import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA,MatDialogRef } from "@angular/material/dialog";
import { SharedModule } from '../../shared.module';


@Component({
    selector: 'app-ConfirmModal',
    standalone: true,
    imports: [SharedModule],
    templateUrl: './modalConfirm.component.html',
    styleUrl: './modalConfirm.component.css',
})

export class ModalConfirmComponent {
    constructor(
        public dialogRef: MatDialogRef<ModalConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { message: string }
    ) { console.log(data.message) }

    onCancelClick(): void {
        this.dialogRef.close(false);
    }

    onConfirmClick(): void {
        this.dialogRef.close(true);
    }
}