import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { LoginRoutingModule } from './login-routing.module';
import { RegisterComponent } from './register.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    //LoginRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ]
})
export class RegisterModule { }
