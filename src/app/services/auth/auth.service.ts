import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { ApiService } from '../api/api.service';
import { User, AuthResponse } from './auth.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private api: ApiService) {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.api.get<AuthResponse>('assets/data/users.json').pipe(
      map(data => {
        const user = data.users.find(u => 
          u.email === email && u.password === password
        );
        
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return true;
        }
        return false;
      })
    );
  }

  signup(userData: Partial<User>): Observable<boolean> {
    return this.api.get<AuthResponse>('assets/data/users.json').pipe(
      map(data => {
        const newUser: User = {
          id: data.users.length + 1,
          firstName: userData.firstName!,
          lastName: userData.lastName!,
          email: userData.email!,
          password: userData.password!
        };
        
        // In a real application, this would be a POST request
        // For demo purposes, we'll just simulate success
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        this.currentUserSubject.next(newUser);
        return true;
      })
    );
  }

  updateProfile(userData: Partial<User>): Observable<boolean> {
    const currentUser = this.currentUserSubject.value;
    if (!currentUser) return new Observable(sub => sub.next(false));

    const updatedUser: User = {
      ...currentUser,
      ...userData
    };

    // In a real application, this would be a PUT request
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    this.currentUserSubject.next(updatedUser);

    // Return an observable that emits 'true' when the update is "successful"
    return of(true);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}