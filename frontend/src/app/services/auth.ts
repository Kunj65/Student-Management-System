import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, firstValueFrom } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { auth_environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStatusSubject = new BehaviorSubject<boolean | null>(null);
  authStatus$ = this.authStatusSubject.asObservable();
  private initPromise: Promise<boolean> | null = null;
    private AUTH_URL = auth_environment.AUTH_URL;
  
  constructor(private http: HttpClient) {}

  signup(data: any): Observable<any> {
    return this.http.post(`${this.AUTH_URL}/signup`, data, { withCredentials: true });
  }

  login(credentials: any): Observable<any> {
    return this.http
      .post(`${this.AUTH_URL}/login`, credentials, { withCredentials: true })
      .pipe(
        tap(() => {
          this.authStatusSubject.next(true);
        }),
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.AUTH_URL}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.authStatusSubject.next(false);
        this.initPromise = null;
      }),
    );
  }

  checkAuth(): Observable<any> {
    return this.http.get(`${this.AUTH_URL}/check-auth`, { withCredentials: true }).pipe(
      tap(() => this.authStatusSubject.next(true)),
      catchError((error) => {
        this.authStatusSubject.next(false);
        return throwError(() => error);
      }),
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.authStatus$.pipe(map((status) => status === true));
  }

  getAuthState(): boolean {
    return this.authStatusSubject.value === true;
  }

  // Returns the SAME promise every time - never creates a second one
  // Guards call this and await it - guaranteed to resolve before route activates
  initializeAuth(): Promise<boolean> {
    if (!this.initPromise) {
      this.initPromise = firstValueFrom(this.checkAuth())
        .then(() => true)
        .catch(() => false);
    }
    return this.initPromise;
  }
}