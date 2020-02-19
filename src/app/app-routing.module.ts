import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/login/login.module').then(
        m => m.LoginModule
      )
  },
  {
    path: 'dashboard',
    component: DefaultComponent,
    children: [{
      path: 'info/:id',
      component: DashboardComponent
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
