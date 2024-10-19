import { HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpRequest, HttpEvent } from '@angular/common/http';

export const interceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: any): Observable<HttpEvent<any>> => {
  // Verificar si estamos en un entorno de navegador antes de acceder a localStorage
  const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

  // Obtener el token JWT del localStorage con la clave 'token' si estamos en un entorno de navegador
  const jwtToken = isBrowser ? localStorage.getItem('token') : null;

  // Definir las rutas que quieres omitir del interceptor
  const excludedUrls = [
    '/usuarios/registro',
    '/usuarios/ingresar'
  ];

  // Verificar si la URL de la petición coincide con alguna de las rutas excluidas
  const isExcluded = excludedUrls.some(url => req.url.includes(url));

  if (isExcluded) {
    // Si la URL está excluida, pasar la petición sin modificar
    return next(req);
  }

  // Si no está excluida y el token está presente, agregar el token JWT en los encabezados
  if (jwtToken) {
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `${jwtToken}`)
    });
    return next(modifiedReq);
  }

  return next(req);
};
