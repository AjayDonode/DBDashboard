import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-snowflake',
  templateUrl: './snowflake.component.html',
  styleUrls: ['./snowflake.component.scss']
})
export class SnowflakeComponent implements OnInit {
  formConnection: FormGroup;

  @Input()
  selectedConnection: any;

  @Input()
  tags = [];

  @Output()
  saveFormEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {
    this.setViewForm();
  }

  ngOnInit(): void {
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

  save(formConnectionValue) {
    console.log(formConnectionValue);
    this.saveFormEvent.emit(formConnectionValue);
  }

}
