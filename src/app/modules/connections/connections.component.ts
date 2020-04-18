import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectConnectionDialogComponent } from './select-connection-dialog/select-connection-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss']
})
export class ConnectionsComponent implements OnInit {

  formConnection: FormGroup;
  // formSelect: FormGroup;
  title = 'materialApp';
  // myControl = new FormControl();
  tags = [];
  connections: any = [];
  selectedConnectionType: any;
  @ViewChild('div') div: ElementRef;


  constructor(private dialog: MatDialog, private conncetionService: ConnectionService, private formBuilder: FormBuilder) {

    this.loadStates();
    this.loadConnections();
    this.setViewForm();
  }

  ngOnInit(): void {

  }

  loadStates() {
    this.tags = ['data migration', 'examples', 'mapping', 'redshift', 'scripting', 'snowflake',
      'transformations', 'user-defined api', 'validation', 'web services', 'workfing with files', 'workflow', 'xslt'];
  }

  setViewForm() {
    this.formConnection = this.formBuilder.group({
      'connectionName': [null, [Validators.required]],
      'description': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      'url': [null, Validators.required],
      'accountName': '',
      'wearhouseName': '',
      'databaseName': '',
      'isAutoCommit': '',
      'runAtConnect': '',
      'jdbcFetchSize': '',
      'maxFieldSize': '',
      'maxRowsToRead': '',
      'incloseInQuote': '',
      'curruntDB': ''
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.connections;
    const dialogRef = this.dialog.open(SelectConnectionDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedConnectionType = result;

      console.log(`Dialog result: ${result.name}`);
    });
  }

  loadConnections() {
    this.conncetionService.getConnections().subscribe(data => {
      //this.connections = data;
      console.log(data);
    });

    this.connections = [{
      name: 'Amazon',
      childs: [{ name: 'AWS', img: 'postgresql.png' }, { name: 'Amazon S3', img: 's3.png' }]
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
    ]
  }

  renderForm() {
    let formdata = [{
      name: 'Connection Name',
      type: 'input',
      value: ''
    }, {
      name: 'Tags',
      type: 'select',
      value: ''
    }, {
      name: 'Description',
      type: 'textarea',
      value: ''
    }
    ]
  }
}
