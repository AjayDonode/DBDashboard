
import { Component, OnInit, Inject, HostListener, Output, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA)
  public data: {
    cancelText: string,
    confirmText: string,
    message: string,
    title: string
},
              private mdDialogRef: MatDialogRef<ConfirmDialogComponent>) { }



public cancel() {
this.close(false);
}
public close(value) {
this.mdDialogRef.close(value);
}
public confirm() {
this.close(true);
}
@HostListener('keydown.esc')
public onEsc() {
this.close(false);
}
}
