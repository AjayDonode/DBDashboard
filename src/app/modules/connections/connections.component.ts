import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectConnectionDialogComponent } from './select-connection-dialog/select-connection-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConnectionService } from 'src/app/services/connection.service';
import { HubService } from 'src/app/services/hub.service';
import { DataHub, Connection } from 'src/app/modals/connection.modal';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, combineLatest } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TagsService } from 'src/app/services/tags.service';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/confirm-dialog.service';


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


  states$: Observable<DataHub[]>;
  filteredStates$: Observable<DataHub[]>;
  filter: FormControl;
  filter$: Observable<string>;


  constructor(private dialog: MatDialog,  private dialogService: ConfirmDialogService,
              private conncetionService: ConnectionService, private hubService: HubService, private tagsService: TagsService) {
    this.loadTags();
    this.loadConnections();
  }


  setFilters() {
    this.states$ = of(this.dataHubs);
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.filteredStates$ = combineLatest([this.states$, this.filter$]).pipe(
      map(([states, filterString]) => states.filter(state => state.datahubname.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
    );
  }

  ngOnInit(): void {
    this.myControl.valueChanges.subscribe(userInput => {
      this.filterConnectionList(userInput);
    });
  }

  loadTags() {
    this.tagsService.getAll().subscribe(data => {
      this.tags = data;
    });
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
      this.dialogService.openSnackBar('Saved : Connection "' + formValue.datahubname + '"');
      this.loadConnectionsForUser(1);
    });
  }

  loadConnectionsForUser(userId: any) {
    console.log('Loading the list of user connections ');
    this.hubService.getAll().subscribe(res => {
      console.log(res);
      this.dataHubs = res;
      this.setFilters();
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


  changeActive(value){
    if (value.checked === true) {
      this.dataHub.activeflag = 1;
    } else {
      this.dataHub.activeflag = 0;
    }
  }

  openDeleteDialog(dataHub: DataHub) {
    const options = {
      title: 'Warning',
      message: 'Do you want to remove connection : ' + dataHub.datahubname,
      cancelText: 'Cancel',
      confirmText: 'Yes'
    };
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.delete(dataHub);
      }
   });
  }

  delete(dataHub: DataHub) {
    this.hubService.deleteConnection(dataHub).subscribe(res => {
      console.log(res);
      const index = this.dataHubs.findIndex(d => d.datahubid === dataHub.datahubid); // find index in your array
      this.dataHubs.splice(index, 1);  // remove element from array
      this.dialogService.openSnackBar('Removed : Connection "' + dataHub.datahubname + '"');
      this.selectedConnectionType = null;
      this.loadConnectionsForUser(1); // TODO better clear from local list :: PERSORNAMCE
    });
  }

  disable(dataHub: DataHub) {}


}
