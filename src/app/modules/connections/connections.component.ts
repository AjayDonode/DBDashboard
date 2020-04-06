import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectConnectionDialogComponent } from './select-connection-dialog/select-connection-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss']
})
export class ConnectionsComponent implements OnInit {

  title = 'materialApp';
  myControl = new FormControl();
  tags = [];
  constructor(private dialog: MatDialog) {
    this.loadStates();
  }

  ngOnInit(): void {
  }


  loadStates() {
    this.tags = ['data migration', 'examples', 'mapping', 'redshift', 'scripting', 'snowflake',
     'transformations', 'user-defined api', 'validation', 'web services', 'workfing with files', 'workflow', 'xslt'];
  }

  openDialog() {
    const dialogRef = this.dialog.open(SelectConnectionDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
