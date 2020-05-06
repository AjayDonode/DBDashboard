import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataHub } from 'src/app/modals/connection.modal';

@Component({
  selector: 'app-snowflake',
  templateUrl: './snowflake.component.html',
  styleUrls: ['./snowflake.component.scss']
})
export class SnowflakeComponent implements OnInit, OnChanges {
  formConnection: FormGroup;

  @Input()
  selectedConnection: any;

  @Input()
  tags = [];

  @Input()
  dataHub: DataHub = null;


  @Output()
  saveFormEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {
    this.setViewForm();
  }

  ngOnInit(): void {
    if (this.dataHub == null) {
      this.setViewForm();
    } else {
      this.setViewFormWithValues(this.dataHub);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.dataHub == null) {
      this.setViewForm();
    }

    this.setViewFormWithValues(this.dataHub);
  }

  setViewForm() {
    this.dataHub = {
      datahubid: '',
      datasourceid: '',
      datahubname: '',
      activeflag: 0,
      conndescription: '',
      connectionpayload: {}
    };
  }


  setViewFormWithValues(dataHub: DataHub) {
    this.formConnection = this.formBuilder.group({
      connectionName: [dataHub.datahubname, [Validators.required]],
      activeflag: [dataHub.activeflag, [Validators.required]],
      description: [dataHub.conndescription, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      url: [dataHub.connectionpayload.url, Validators.required],
      accountName: dataHub.connectionpayload.accountName,
      wearhouseName: dataHub.connectionpayload.wearhouseName,
      databaseName: dataHub.connectionpayload.databaseName,
      runAtConnect: dataHub.connectionpayload.runAtConnect,
      jdbcFetchSize: dataHub.connectionpayload.jdbcFetchSize,
      maxFieldSize: dataHub.connectionpayload.maxFieldSize,
      maxRowsToRead: dataHub.connectionpayload.maxRowsToRead,
      incloseInQuote: dataHub.connectionpayload.incloseInQuote,
      schemaname: dataHub.connectionpayload.schemaname,
      username: dataHub.connectionpayload.username,
      password: dataHub.connectionpayload.password,
      autocomit: dataHub.connectionpayload.autocomit,
      otherparams: dataHub.connectionpayload.otherparams,
      curruntDB: dataHub.connectionpayload.curruntDB,
    });
  }

  onToggleChange(value) {
    if (value.checked === true) {
      this.dataHub.activeflag = 1;
    } else {
      this.dataHub.activeflag = 0;
    }
  }

  save(form) {
    if (this.dataHub == null ) {
      this.dataHub = new DataHub();
    }
    this.dataHub.datahubid = this.selectedConnection.datasourcespk;
    this.dataHub.datahubname = form.connectionName;
    this.dataHub.conndescription = form.description;
    this.dataHub.connectionpayload = {
      url: form.url,
      accountName: form.accountName,
      wearhouseName: form.wearhouseName,
      databaseName: form.databaseName,
      autocomit: form.autocomit,
      runAtConnect: form.runAtConnect,
      jdbcFetchSize: form.jdbcFetchSize,
      maxFieldSize: form.maxFieldSize,
      maxRowsToRead: form.maxRowsToRead,
      incloseInQuote: form.incloseInQuote,
      curruntDB: form.curruntDB,
      schemaname: form.schemaname,
      otherparams: form.otherparams,
      username: form.username,
      password: form.password
    };

    console.log(this.dataHub);

    this.saveFormEvent.emit(this.dataHub);
  }

}
