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
    if(this.dataHub == null) {
      this.setViewForm();
    } else {
      this.setViewFormWithValues(this.dataHub);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.dataHub == null) {
      this.setViewForm();
    } else {
      this.setViewFormWithValues(this.dataHub);
    }
  }

  setViewForm() {
    this.formConnection = this.formBuilder.group({
      connectionName: [null, [Validators.required]],
      description: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      url: [null, Validators.required],
      accountName: '',
      wearhouseName: '',
      databaseName: '',
      isAutoCommit: '',
      runAtConnect: '',
      jdbcFetchSize: '',
      maxFieldSize: '',
      maxRowsToRead: '',
      incloseInQuote: '',
      schemaname: '',
      username: '',
      password: '',
      autocomit: '',
      otherparams: '',
      curruntDB: ''
    });
  }


  setViewFormWithValues(dataHub: DataHub) {
    this.formConnection = this.formBuilder.group({
      connectionName: [dataHub.datahubname, [Validators.required]],
      description: [dataHub.conndescription, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      url: [dataHub.connectionpayload.url, Validators.required],
      accountName: dataHub.connectionpayload.connectionName,
      wearhouseName: dataHub.connectionpayload.wearhouseName,
      databaseName: dataHub.connectionpayload.databaseName,
      isAutoCommit: dataHub.connectionpayload.isAutoCommit,
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

  save(form) {
    if (this.dataHub == null ) {
      this.dataHub = new DataHub();
    }
    this.dataHub.datasourceid = this.selectedConnection.datasourcespk;
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
      curruntDB: form.curruntDB
    };

    console.log(this.dataHub);

    this.saveFormEvent.emit(this.dataHub);
  }

}
