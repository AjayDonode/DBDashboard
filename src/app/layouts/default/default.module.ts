import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { ConnectionsComponent } from 'src/app/modules/connections/connections.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatListModule} from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { SelectConnectionDialogComponent } from 'src/app/modules/connections/select-connection-dialog/select-connection-dialog.component';
import { FlowsComponent } from 'src/app/modules/flows/flows.component';
import { SchedulesComponent } from 'src/app/modules/schedules/schedules.component';
import { AuditComponent } from 'src/app/modules/audit/audit.component';
import { RegisterComponent } from 'src/app/modules/register/register.component';


import { SnowflakeComponent } from 'src/app/modules/connections/forms/snowflake/snowflake.component';
import { TerradataComponent } from 'src/app/modules/connections/forms/terradata/terradata.component';
import { OracleComponent } from 'src/app/modules/connections/forms/oracle/oracle.component';


@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    FlowsComponent,
    SchedulesComponent,
    AuditComponent,
    PostsComponent,
    ConnectionsComponent,
    SelectConnectionDialogComponent,
    RegisterComponent,
    SnowflakeComponent,
    TerradataComponent,
    OracleComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    BrowserModule, HttpClientModule,
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatFormFieldModule, MatInputModule, MatAutocompleteModule, FormsModule, ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatTooltipModule,
    ScrollingModule
  ],
  exports: [ SnowflakeComponent, TerradataComponent, OracleComponent, MatTooltipModule ]
})
export class DefaultModule { }
