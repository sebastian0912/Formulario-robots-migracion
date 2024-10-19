import { Component, EventEmitter, Inject, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { catchError, filter } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { of } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import moment from 'moment';
import { AntecedentesService } from '../../services/antecedentes/antecedentes.service';


@Component({
  selector: 'app-navbar-lateral',
  standalone: true,
  imports: [
    RouterLink,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgIf
  ],
  templateUrl: './navbar-lateral.component.html',
  styleUrls: ['./navbar-lateral.component.css']
})
export class NavbarLateralComponent implements OnInit {
  overlayVisible = false;
  loaderVisible = false;
  counterVisible = false;

  currentRole: string = '';

  rolePermissions: any = {
    GERENCIA: [
      'forma-pago', 'desprendibles-pago', 'arl',
      'ausentismos', 'reporte-contratacion', 'seguimiento-auditoria',
      'estadisticas-auditoria', 'envio-paquete-documentacion', 'recibir-paquete-documentacion',
      'personal-activo'
    ],
    RECEPCION: [
      'forma-pago', 'desprendibles-pago', 'ausentismos'
    ],
    COORDINADOR: [
      'forma-pago', 'desprendibles-pago', 'ausentismos',
      'seguimiento-auditoria',
    ],
    JEFE_DE_AREA: [
      'forma-pago', 'desprendibles-pago',
      'ausentismos', 'seguimiento-auditoria', 'estadisticas-auditoria',
      'ver-reporte', 'reporte-contratacion',
    ],
    ADMIN: [
      'forma-pago', 'desprendibles-pago',
      'arl', 'ausentismos', 'publicidad', 'vacantes',
      'seguimiento-auditoria', 'estadisticas-auditoria', 'seguimiento-auditoria-archivo',
      'personal-activo',
      'reporte-contratacion', 'seguimiento-auditoria',
      'formulario-incapacicades', 'subida-archivos-incapacidades',
      'buscar-incapacicades', 'incapacidades-totales', 'seleccion',
      'contratacion',
      'archivos-contratacion', 'ver-reporte', 'adres',
      'reporte-vetado', 'vetados-gerencia',
    ],
    TESORERIA: [
      'forma-pago', 'desprendibles-pago', 'ausentismos'
    ],
    CAROL: [
      'forma-pago', 'desprendibles-pago', 'arl',
      'ausentismos', 'reporte-contratacion', 'personal-activo',
      'reporte-contratacion', 'ver-reporte'
    ],
    INCAPACIDADADMIN: [
      'forma-pago', 'desprendibles-pago', 'ausentismos',
      'incapacidades-totales', 'subida-archivos-incapacidades', 'buscar-incapacicades',
      'formulario-incapacicades', 'reporte-contratacion', 'ver-reporte'
    ],
    INCAPACIDADSUBIDA: [
      'formulario-incapacicades', 'forma-pago', 'desprendibles-pago',
      'ausentismos'
    ],
    AUX_CONTRATACION: [
      'reporte-contratacion',
      'ver-reporte',
      'forma-pago', 'desprendibles-pago',
      'ausentismos', 'seguimiento-auditoria'
    ],
    reporteIncapacidad: [
      'formulario-incapacicades', 'forma-pago', 'desprendibles-pago',
      'ausentismos',
      'ver-reporte', 'reporte-contratacion',
    ],


  };

  public isMenuVisible = true;
  // Crear un Output Event para emitir el cambio de estado
  @Output() menuToggle = new EventEmitter<boolean>();

  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
    this.menuToggle.emit(this.isMenuVisible); // Emitir el estado del menú

    // Guardar el estado en localStorage
    localStorage.setItem('menuVisible', JSON.stringify(this.isMenuVisible));
  }

  currentRoute: string | undefined;

  constructor(
    private router: Router,
    private antecedentesService: AntecedentesService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects;
    });

    //const savedState = localStorage.getItem('menuVisible');
    //this.isMenuVisible = savedState !== null ? JSON.parse(savedState) : true;

  }

  async ngOnInit(): Promise<void> {
    const user = await this.getUser();
  }





  async getUser(): Promise<any> {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  hasPermission(option: string): boolean {
    return this.rolePermissions[this.currentRole]?.includes(option) ?? false;
  }

  cerrarSesion(): void {
    localStorage.clear();
  }


}
