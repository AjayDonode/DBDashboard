import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  id;

  constructor(private _Activatedroute: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {

    this._Activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }


}
