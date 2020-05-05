import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flows',
  templateUrl: './flows.component.html',
  styleUrls: ['./flows.component.scss']
})
export class FlowsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = [
    {id: 1560608769632, name: 'Artificial Intelligence'},
    {id: 1560608796014, name: 'Machine Learning'},
    {id: 1560608787815, name: 'Robotic Process Automation'},
    {id: 1560608805101, name: 'Blockchain'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

  edit() {

  }
  delete(){

  }
}
