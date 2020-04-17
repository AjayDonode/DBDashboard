import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AppUser } from 'src/app/modals/appuser.modal';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  appUser:AppUser;
  constructor(private router: Router, private authService: AuthService) { }

  public register(email: string, password: string) {
    this.authService.login(email, password).then( res => {
      this.appUser = res;
      this.router.navigate(['dashboard'], { replaceUrl: true });
    })
  }
  ngOnInit(): void {
  }

}
