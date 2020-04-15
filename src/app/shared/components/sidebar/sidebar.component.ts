import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { AuthService } from 'src/app/services/auth.service';
import { AppUser } from 'src/app/modals/appuser.modal';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  appUser: AppUser;

constructor(private authService: AuthService) {
    this.appUser = this.authService.getCurrentUser();
   }

  }
