import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { PostsComponent } from './modules/posts/posts.component';
import { ConnectionsComponent } from './modules/connections/connections.component';
import { FlowsComponent } from './modules/flows/flows.component';
import { SchedulesComponent } from './modules/schedules/schedules.component';
import { AuditComponent } from './modules/audit/audit.component';
import { SelectConnectionDialogComponent } from './modules/connections/select-connection-dialog/select-connection-dialog.component';
// import { EditableTableModule } from 'ng-editable-table/editable-table/editable-table.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
