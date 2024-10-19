import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesRobotsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }


  private handleError(error: any): Observable<never> {
    return throwError(() => new Error(error.message || 'Error en la solicitud HTTP'));
  }
  


  // EstadosRobots/sin_consultar
  consultarEstadosRobots(): Observable<any> {
    return this.http.get(`${this.apiUrl}/EstadosRobots/sin_consultar`)
      .pipe(catchError(this.handleError));
  }

}
