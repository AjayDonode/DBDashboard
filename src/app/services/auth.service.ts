import { Injectable } from '@angular/core';
import { AppUser } from '../modals/appuser.modal';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  login(email: string, password: string): Promise<any> {
    //TODO implement Auth service

    // localStorage.setItem('user', null);
    let appuser: AppUser = new AppUser();
    let username = '';
    if (email == 'ajaydonode@cisco.com') {
      username = 'Ajay Donode';
    } else if (email == 'sumalik@cisco.com') {
      username = 'Sunny Mallik';
    } else if (email == 'lalitagr@cisco.com') {
      username = 'Lalit Agrawal';
    }
    appuser.name = username;
    appuser.email = email;
    localStorage.setItem('user', JSON.stringify(appuser));
    let promise = new Promise((resolve, reject) => {
      resolve(appuser);
    });
    return promise;
  }

  getCurrentUser(): AppUser {
    let user: AppUser = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  logOut() {
    localStorage.removeItem('user');
  }

  constructor() { }
}
