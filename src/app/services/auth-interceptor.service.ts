/**
 * Diese Methode fängt HTTP-Anfragen ab, um ein Authentifizierungs-Token zu den Anforderungs-Headern hinzuzufügen.
 * Wenn das Token vorhanden ist, wird es im Authorization-Header der Anfrage gesendet.
 * Falls ein 401 Unauthorized-Fehler auftritt, wird der Benutzer zur Login-Seite weitergeleitet.
 */

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');

    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Token ${token}` },
      });
    }
    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigateByUrl('/login');
          }
        }
        return throwError(() => err);
      })
    );
  }
}