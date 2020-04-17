import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectConnectionDialogComponent } from './select-connection-dialog/select-connection-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss']
})
export class ConnectionsComponent implements OnInit {

  title = 'materialApp';
  myControl = new FormControl();
  tags = [];
  connections: any = [];
  selectedConnectionType: any;
  @ViewChild('div') div: ElementRef;


  constructor(private dialog: MatDialog, private conncetionService: ConnectionService, private renderer: Renderer2) {
    this.loadStates();
    this.loadConnections();
  }

  ngOnInit(): void {
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
      this.selectedConnectionType = result;
      // this.renderForm();
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
    const form: HTMLParagraphElement = this.renderer.createElement('form');
    let htmlcontent = '';
    formdata.forEach(element => {
      console.log(element.name);
      switch (element.type) {
        case 'input': {
          htmlcontent = htmlcontent + '<mat-form-field appearance="outline"> <mat-label>'+element.name+'</mat-label> <input matInput placeholder="'+element.name+'"></mat-form-field> <br>';
          break;
        }
        case 'select': {
          htmlcontent = htmlcontent + '<mat-form-field appearance="outline"> <mat-label>'+element.name+'</mat-label> <input type="text" matInput placeholder="'+element.name+'"></mat-form-field><br>';
          break;
        } case 'textarea': {
          htmlcontent = htmlcontent + '<mat-form-field appearance="outline"> <mat-label>'+element.name+'</mat-label> <input type="text" matInput placeholder="'+element.name+'"></mat-form-field><br>';
          break;
        }
        default: {
          //statements;
          break;
        }
      }
    });
    form.innerHTML = htmlcontent;
    this.renderer.appendChild(this.div.nativeElement, form);
  }
}
