import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-connection-dialog',
  templateUrl: './select-connection-dialog.component.html',
  styleUrls: ['./select-connection-dialog.component.scss']
})
export class SelectConnectionDialogComponent implements OnInit {

  connections: any = [];
  constructor() { }

  ngOnInit(): void {
    this.loadConnections();
  }

  loadConnections() {
    this.connections = [{ 'name': 'Oracle', 'img-src': '/path' }, { 'name': 'Postgres', 'img-src': '/path' },
    { 'name': 'PostgresA', 'img-src': '/path' }];
  }

}
