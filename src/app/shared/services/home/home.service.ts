import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  // Función para obtener el nombre completo del candidato
  traerInformacionContratacion(cedula: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/contratacion/traerNombreCompletoCandidato/${cedula}`)
      .pipe(
        catchError((error) => {
          // Manejo personalizado de errores
          if (error.status === 404) {
            return throwError(() => new Error('El documento no fue encontrado'));
          }
          return throwError(() => new Error('Ocurrió un error al procesar la solicitud.'));
        })
      );

  }
}
