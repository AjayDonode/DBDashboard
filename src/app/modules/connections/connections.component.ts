import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectConnectionDialogComponent } from './select-connection-dialog/select-connection-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConnectionService } from 'src/app/services/connection.service';
import { HubService } from 'src/app/services/hub.service';
import { DataHub } from 'src/app/modals/connection.modal';


@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss']
})
export class ConnectionsComponent implements OnInit {
  title = 'materialApp';
  tags = [];
  connections: any = [];
  dataHubs: any = [];
  dataHub: DataHub;
  selectedConnectionType: any;
  myControl = new FormControl();
  constructor(private dialog: MatDialog, private conncetionService: ConnectionService, private hubService: HubService) {
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
    this.conncetionService.getConnections().subscribe(data => {
      // this.connections = data;
      console.log(data);
    });

    this.connections = [{
      name: 'Amazon',
      childs: [{ name: 'AWS', img: 'postgresql.png' }, { name: 'Amazon S3', img: 's3.png' }]
    },
    {
      name: 'Snowflakes',
      childs: [{ name: 'Snowflake',  datasourcespk: '54f27422-d19d-4658-b8f3-2f1443d3aae6', img: 'snowflake.png' },
       { name: 'Snowflake S3', img: 's3.png' }]
    },
    {
      name: 'Database',
      childs: [{ name: 'Microsoft Sql Server', img: 'snowflake.png' }, { name: 'Snowflake S3', img: 's3.png' }]
    },
    {
      name: 'Oracle',
      childs: [{ name: 'Oracle CDC', img: 'oracle.png' }, { name: 'Oracle LDAP', img: 'snowflake.png' },
      { name: 'Oracle DB', img: 'oracle.png' }, {
        name: 'Oracle LDAP',
        img: 'snowflake.png'
      }, { name: 'Oracle LDAP', img: 'snowflake.png' }]
    }
    ];

    this.loadConnectionsForUser(1);
  }

  public save(formValue: any): void {
    console.log('Form Value in Parent : ', formValue);
    this.hubService.saveConnection(formValue).subscribe(res => {
      console.log(res);
      this.selectedConnectionType = null;
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

selectDataHub(dataHub: DataHub){
  this.dataHub = dataHub;
  let datasourcetype = { name: 'Snowflake',  datasourcespk: '54f27422-d19d-4658-b8f3-2f1443d3aae6', img: 'snowflake.png' };
  this.selectedConnectionType = datasourcetype;
}

filterConnectionList(input: string) {
  if (typeof input != "string") {
    return [];
}
if (input === '' || input === null) {
    return [];
}
  return input ?
  this.dataHubs.filter(dataHub => dataHub.datahubname.toLowerCase().indexOf(input.toLowerCase()) != -1): this.dataHubs;
}
}
