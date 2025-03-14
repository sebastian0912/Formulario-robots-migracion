import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AntecedentesService {
  private apiUrl = environment.apiUrl;
  // Variables globales
  numeroDocumento: string | null = null;
  codigoContrato: string | null = null;
  tipoDocumento: string | null = null;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {

  }

  // Método para manejar los errores de la solicitud HTTP
  private handleError(error: any): Observable<never> {
    return throwError(() => new Error('Error en la solicitud: ' + error.message));
  }


  // Cargar adres
  cargarAdres(datos: any): Observable<any> {
    // Crear una instancia de FormData para enviar archivos
    const formData = new FormData();

    // Añadir los campos al FormData
    formData.append('cedula', datos.numeroDocumento);  // Asignar el numeroDocumento actualizado
    formData.append('tipo_documento', datos.tipoDocumento);  // Asignar el tipoDocumento actualizado

    formData.append('departamento', datos.departamento);
    formData.append('municipio', datos.municipio);
    formData.append('estado', datos.estado);
    formData.append('entidad', datos.entidad);
    formData.append('regimen', datos.regimen);
    formData.append('fechaAfiliacionEfectiva', datos.fechaAfiliacionEfectiva);
    formData.append('fechaFinalizacionAfiliacion', datos.fechaFinalizacionAfiliacion);
    formData.append('tipoAfiliacion', datos.tipoAfiliacion);
    formData.append('fechaAdress', datos.fechaAdress);
    formData.append('title', datos.title);
    formData.append('nombre', datos.nombre);
    formData.append('apellido', datos.apellido);

    // Añadir el archivo PDF si existe
    if (datos.pdfDocumento) {
      formData.append('pdfDocumento', datos.pdfDocumento);
    }

    // Imprimir cada campo de FormData usando forEach
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // Enviar la solicitud HTTP POST al endpoint de la API
    return this.http.post<any>(`${this.apiUrl}/Robots/crear_adres/`, formData)
      .pipe(
        catchError(this.handleError)  // Manejo de errores
      );
  }

  // Cargar datos de policivos
  cargarPolicivo(datos: any): Observable<any> {


    // Crear una instancia de FormData para enviar archivos
    const formData = new FormData();

    // Añadir los campos al FormData
    formData.append('cedula', datos.numeroDocumento);  // Asignar el numeroDocumento actualizado
    formData.append('tipo_documento', datos.tipoDocumento);  // Asignar el tipoDocumento actualizado

    formData.append('estado_policivo', datos.estadoPolicivo);  // Estado Policivo
    formData.append('title', datos.title);

    // Añadir el archivo PDF si existe
    if (datos.pdfPolicivo) {
      formData.append('pdfPolicivo', datos.pdfPolicivo);
    }

    // Imprimir cada campo de FormData usando forEach
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // Enviar la solicitud HTTP POST al endpoint de la API
    return this.http.post<any>(`${this.apiUrl}/Robots/crear_policivo/`, formData)
      .pipe(
        catchError(this.handleError)  // Manejo de errores
      );
  }

  // Cargar datos de ofac
  cargarOfac(datos: any): Observable<any> {

    // Crear una instancia de FormData para enviar archivos
    const formData = new FormData();

    // Añadir los campos al FormData
    formData.append('cedula', datos.numeroDocumento);  // Asignar el numeroDocumento actualizado
    formData.append('tipo_documento', datos.tipoDocumento);  // Asignar el tipoDocumento actualizado

    formData.append('estado_ofac', datos.estadoOfac);  // Estado OFAC
    formData.append('title', datos.title);
    formData.append('fecha_ofac', datos.fechaOfac);

    // Añadir el archivo PDF si existe
    if (datos.pdfOfac) {
      formData.append('pdfOfac', datos.pdfOfac);
    }

    // Imprimir cada campo de FormData usando forEach
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // Enviar la solicitud HTTP POST al endpoint de la API
    return this.http.post<any>(`${this.apiUrl}/Robots/crear_ofac/`, formData)
      .pipe(
        catchError(this.handleError)  // Manejo de errores
      );
  }

  // Cargar datos de Controlaria
  cargarContraloria(datos: any): Observable<any> {

    // Crear una instancia de FormData para enviar archivos
    const formData = new FormData();

    // Añadir los campos al FormData
    formData.append('cedula', datos.numeroDocumento);  // Asignar el numeroDocumento actualizado
    formData.append('tipo_documento', datos.tipoDocumento);  // Asignar el tipoDocumento actualizado

    formData.append('estado_contraloria', datos.estadoContraloria);  // Estado Controlaria
    formData.append('title', datos.title);
    formData.append('fecha_contraloria', datos.fechaContraloria);

    // Añadir el archivo PDF si existe
    if (datos.pdfContraloria) {
      formData.append('pdfContraloria', datos.pdfContraloria);
    }

    // Imprimir cada campo de FormData usando forEach
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // Enviar la solicitud HTTP POST al endpoint de la API
    return this.http.post<any>(`${this.apiUrl}/Robots/crear_contraloria/`, formData)
      .pipe(
        catchError(this.handleError)  // Manejo de errores
      );
  }

  // Cargar datos de Sisben
  cargarSisben(datos: any): Observable<any> {


    // Crear una instancia de FormData para enviar archivos
    const formData = new FormData();

    // Añadir los campos al FormData
    formData.append('cedula', datos.numeroDocumento);  // Asignar el numeroDocumento actualizado
    formData.append('tipo_documento', datos.tipoDocumento);  // Asignar el tipoDocumento actualizado

    formData.append('estado_sisben', datos.estado_sisben);  // Estado Sisben
    formData.append('tipo_sisben', datos.tipo_sisben);  // Tipo Sisben
    formData.append('title', datos.title);  // Nivel Sisben
    formData.append('fecha_sisben', datos.fechaSisben);  // Fecha Sisben

    // Añadir el archivo PDF si existe
    if (datos.pdfSisben) {
      formData.append('pdfSisben', datos.pdfSisben);
    }

    // Imprimir cada campo de FormData usando forEach
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // Enviar la solicitud HTTP POST al endpoint de la API
    return this.http.post<any>(`${this.apiUrl}/Robots/crear_sisben/`, formData)
      .pipe(
        catchError(this.handleError)  // Manejo de errores
      );
  }


  // Cargar datos de Procuraduria
  cargarProcuraduria(datos: any): Observable<any> {


    // Crear una instancia de FormData para enviar archivos
    const formData = new FormData();

    // Añadir los campos al FormData
    formData.append('cedula', datos.numeroDocumento);  // Asignar el numeroDocumento actualizado
    formData.append('tipo_documento', datos.tipoDocumento);  // Asignar el tipoDocumento actualizado

    formData.append('estado_procuraduria', datos.estado_procuraduria);  // Estado Procuraduria
    formData.append('title', datos.title);
    formData.append('fecha_procuraduria', datos.fecha_procuraduria);  // Fecha Procuraduria
    // Añadir el archivo PDF si existe
    if (datos.pdfProcuraduria) {
      formData.append('pdfProcuraduria', datos.pdfProcuraduria);
    }

    // Imprimir cada campo de FormData usando forEach
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // Enviar la solicitud HTTP POST al endpoint de la API
    return this.http.post<any>(`${this.apiUrl}/Robots/crear_procuraduria/`, formData)
      .pipe(
        catchError(this.handleError)  // Manejo de errores
      );
  }

  // Cargar fondos de pension
  cargarFondoPension(datos: any): Observable<any> {


    // Crear una instancia de FormData para enviar archivos
    const formData = new FormData();

    // Añadir los campos al FormData
    formData.append('cedula', datos.numeroDocumento);  // Asignar el numeroDocumento actualizado
    formData.append('tipo_documento', datos.tipoDocumento);  // Asignar el tipoDocumento actualizado

    formData.append('estado_fondo_pension', datos.estadoFondoPension);  // Estado Fondo Pension
    formData.append('entidad_fondo_pension', datos.entidad_fondo_pension);  // Entidad Fondo Pension
    formData.append('title', datos.title);
    formData.append('fecha_fondo_pension', datos.fecha_fondo_pension);  // Fecha Fondo Pension

    // Añadir el archivo PDF si existe
    if (datos.pdfFondoPension) {
      formData.append('pdfFondoPension', datos.pdfFondoPension);
    }

    // Imprimir cada campo de FormData usando forEach
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // Enviar la solicitud HTTP POST al endpoint de la API
    return this.http.post<any>(`${this.apiUrl}/Robots/crear_fondo_pension/`, formData)
      .pipe(
        catchError(this.handleError)  // Manejo de errores
      );
  }


  // Método para combinar y guardar documentos con orden de documentos y rango de fechas
  combinarDocumentos(ordenDocumentos: number[], startDate: string, endDate: string): Observable<any> {
    // Convertir el array de números (ordenDocumentos) a una cadena separada por comas
    const orden = ordenDocumentos.join(',');

    // Agregar los parámetros de consulta 'orden_documentos', 'start', y 'end'
    const params = new HttpParams()
      .set('orden_documentos', orden)
      .set('start', startDate)
      .set('end', endDate);

    // Realizar la solicitud GET al endpoint con los parámetros de consulta
    return this.http.get(`${this.apiUrl}/Robots/unir_documentos/`, {
      params,
      responseType: 'blob' // Indicar que la respuesta será un archivo binario (blob)
    }).pipe(
      catchError(this.handleError)
    );
  }


  // Cargar datos de Medidas Correctivas
  cargarMedidasCorrectivas(datos: any): Observable<any> {
    // Crear una instancia de FormData para enviar archivos
    const formData = new FormData();

    // Añadir los campos al FormData
    formData.append('cedula', datos.numeroDocumento);  // Asignar el numeroDocumento actualizado
    formData.append('tipo_documento', datos.tipoDocumento);  // Asignar el tipoDocumento actualizado
    formData.append('expediente', datos.expediente);
    formData.append('formato', datos.formato);
    formData.append('id_infractor', datos.idInfractor);
    formData.append('infractor', datos.infractor);
    formData.append('id_custodio', datos.idCustodio);
    formData.append('custodio', datos.custodio);
    formData.append('nit', datos.nit);
    formData.append('razon_social', datos.razonSocial);
    formData.append('id_representante', datos.idRepresentante);
    formData.append('representante', datos.representante);
    formData.append('fecha_medidas_correctivas', datos.fechaMedidasCorrectivas);
    formData.append('departamento_medidas_correctivas', datos.departamentoMedidasCorrectivas);
    formData.append('municipio_medidas_correctivas', datos.municipioMedidasCorrectivas);
    formData.append('apelacion', datos.apelacion);
    formData.append('estado_medidas_correctivas', datos.estadoMedidasCorrectivas);
    formData.append('articulo', datos.articulo);
    formData.append('numeral', datos.numeral);
    formData.append('literal', datos.literal);
    formData.append('localidad', datos.localidad);
    formData.append('relato_hechos', datos.relatoHechos);
    formData.append('descargos', datos.descargos);
    formData.append('numero_de_medidas_correctivas', datos.numeroDeMedidasCorrectivas);
    formData.append('title', datos.title);

    // Añadir el archivo PDF si existe
    if (datos.pdfMedidas) {
      formData.append('pdfMedidas', datos.pdfMedidas);
    }

    // Imprimir cada campo de FormData usando forEach para depuración
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // Enviar la solicitud HTTP POST al endpoint de la API
    return this.http.post<any>(`${this.apiUrl}/Robots/crear_medidas_correctivas/`, formData)
      .pipe(
        catchError(this.handleError)  // Manejo de errores
      );
  }





}
