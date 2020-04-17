import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { ConnectionsComponent } from './modules/connections/connections.component';
import { FlowsComponent } from './modules/flows/flows.component';
import { SchedulesComponent } from './modules/schedules/schedules.component';
import { AuditComponent } from './modules/audit/audit.component';
import { RegisterComponent } from './modules/register/register.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/login/login.module').then(
        m => m.LoginModule
      )
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'connections',
    component: ConnectionsComponent
  },
  {
    path: 'dashboard',
    component: DefaultComponent,
    children: [{
      path: 'info/:id',
      component: DashboardComponent
    }, {
      path: 'connections',
      component: ConnectionsComponent
    },
    {
      path: 'flows',
      component: FlowsComponent
    }, {
      path: 'schedules',
      component: SchedulesComponent
    },
    {
      path: 'audit',
      component: AuditComponent
    },
    {
      path: 'posts',
      component: PostsComponent
    }]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
