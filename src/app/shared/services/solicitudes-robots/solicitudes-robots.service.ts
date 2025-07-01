import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesRobotsService {
  private apiUrl = environment.apiUrl;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Determina si el código se está ejecutando en el navegador.
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  private handleError(error: any): Observable<never> {
    return throwError(() => new Error(error.message || 'Error en la solicitud HTTP'));
  }

  // EstadosRobots/sin_consultar
  consultarEstadosRobots(): Observable<any> {
    if (this.isBrowser) {
      return this.http.get(`${this.apiUrl}/EstadosRobots/sin_consultar`)
        .pipe(catchError(this.handleError));
    } else {
      // Si no está en el navegador, evita realizar la petición
      return of(null);
    }
  }

  // EstadosRobots/pendientes_por_oficina
  consultarEstadosRobotsPendientesPorOficina(): Observable<any> {
    if (this.isBrowser) {
      return this.http.get(`${this.apiUrl}/EstadosRobots/pendientes_por_oficina`)
        .pipe(catchError(this.handleError));
    } else {
      return of(null);
    }
  }

  // EstadosRobots/pendientes_generales
  consultarEstadosRobotsPendientesGenerales(): Observable<any> {
    if (this.isBrowser) {
      return this.http.get(`${this.apiUrl}/EstadosRobots/pendientes_generales`)
        .pipe(catchError(this.handleError));
    } else {
      return of(null);
    }
  }
}
