import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/login`, { email, password })
      .pipe(map(response => {
        const user: User = {
          _id: response.user._id,
          email: response.user.email,
          firstname: response.user.firstname,
          lastname: response.user.lastname,
          onboardingCompletedAt: response.user.onboardingCompletedAt,
          token: response.token,
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  register(firstname: string, lastname: string, email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users`, { firstname, lastname, email, password })
      .pipe(map(response => {
        const user: User = {
          _id: response.user._id,
          email: response.user.email,
          firstname: response.user.firstname,
          lastname: response.user.lastname,
          onboardingCompletedAt: response.user.onboardingCompletedAt,
          token: response.token,
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  updateCurrentUserProfile(user : User) {
    const nextUser: User = this.currentUserValue;

    nextUser.firstname = user.firstname;

    localStorage.setItem('currentUser', JSON.stringify(nextUser));
    this.currentUserSubject.next(nextUser);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}