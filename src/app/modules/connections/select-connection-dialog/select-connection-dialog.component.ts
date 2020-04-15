import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConnectionService } from 'src/app/services/connection.service';
@Component({
  selector: 'app-select-connection-dialog',
  templateUrl: './select-connection-dialog.component.html',
  styleUrls: ['./select-connection-dialog.component.scss']
})
export class SelectConnectionDialogComponent implements OnInit {

  connections: any = [];
  connectionTypes: any = [];


  constructor(public dialogRef: MatDialogRef<SelectConnectionDialogComponent> , @Inject(MAT_DIALOG_DATA) data) {
    this.connections = data;
   }

  ngOnInit(): void {
    this.showInfoAll();
  }



  showInfoAll() {
    this.connections.forEach(element => {
      console.log(element.childs);
      this.connectionTypes = this.connectionTypes.concat(element.childs);
    });
  }
  showInfo(connection: any) {
    this.connectionTypes = connection.childs;
  }

  navigate(connectionType: any) {
    this.dialogRef.close(connectionType);
  }
}
