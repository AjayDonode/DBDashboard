import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectConnectionDialogComponent } from './select-connection-dialog/select-connection-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConnectionService } from 'src/app/services/connection.service';
import { HubService } from 'src/app/services/hub.service';
import { DataHub, Connection } from 'src/app/modals/connection.modal';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss']
})
export class ConnectionsComponent implements OnInit {
  tags = [];
  connections: any = [];
  dataHubs: any = [];
  dataHub: DataHub;
  selectedConnectionType: any;
  myControl = new FormControl();
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar,
              private conncetionService: ConnectionService, private hubService: HubService) {
    this.loadStates();
    this.loadConnections();
  }

  ngOnInit(): void {
    this.myControl.valueChanges.subscribe(userInput => {
      this.filterConnectionList(userInput);
    });
  }

  loadStates() {
    this.tags = ['data migration', 'examples', 'mapping', 'redshift', 'scripting', 'snowflake',
      'transformations', 'user-defined api', 'validation', 'web services', 'workfing with files', 'workflow', 'xslt'];
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.connections;
    const dialogRef = this.dialog.open(SelectConnectionDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.dataHub = null;
      this.selectedConnectionType = result;
    });
  }

  loadConnections() {
    this.conncetionService.getConnectionsById(1).subscribe(data => {
      this.connections = _.chain(data).groupBy('usersourcecategory').map((v, i) => {
        return {
          name: i,
          childs: _.map(v)
        };
      }).value();

    });
    this.loadConnectionsForUser(1);
  }


  public save(formValue: any): void {
    console.log('Form Value in Parent : ', formValue);
    this.hubService.saveConnection(formValue).subscribe(res => {
      this.openSnackBar('Saved : Connection "' + formValue.datahubname + '"');
      this.loadConnectionsForUser(1);
    });
  }

  loadConnectionsForUser(userId: any) {
    console.log('Loading the list of user connections ');
    this.hubService.getAll().subscribe(res => {
      console.log(res);
      this.dataHubs = res;
    });
  }

  // Called when list of connection clicked
  selectDataHub(dataHub: DataHub) {
    this.dataHub = dataHub;
    const datasourcetype = { name: dataHub.datahubname, datasourcespk: dataHub.datasourceid,
      datasourcetype: dataHub.connectionpayload.connectiontype };
    this.selectedConnectionType = datasourcetype;
  }

  filterConnectionList(input: string) {
    if (typeof input !== 'string') {
      return [];
    }
    if (input === '' || input === null) {
      return [];
    }
    return input ?
      this.dataHubs.filter(dataHub => dataHub.datahubname.toLowerCase().indexOf(input.toLowerCase()) !== -1) : this.dataHubs;
  }

  delete(dataHub: DataHub) {
    this.hubService.deleteConnection(dataHub).subscribe(res => {
      console.log(res);
      const index = this.dataHubs.findIndex(d => d.datahubid === dataHub.datahubid); // find index in your array
      this.dataHubs.splice(index, 1);  // remove element from array
      this.openSnackBar('Removed : Connection "' + dataHub.datahubname + '"');
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
