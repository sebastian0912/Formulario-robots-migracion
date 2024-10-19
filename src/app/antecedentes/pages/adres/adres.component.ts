import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { NavbarLateralComponent } from '../../../shared/components/navbar-lateral/navbar-lateral.component';
import { NavbarSuperiorComponent } from '../../../shared/components/navbar-superior/navbar-superior.component';
import Swal from 'sweetalert2';
import { AntecedentesService } from '../../../shared/services/antecedentes/antecedentes.service';
import { HomeService } from '../../../shared/services/home/home.service';

@Component({
  selector: 'app-adres',
  standalone: true,
  imports: [
    // Componentes compartidos
    NavbarLateralComponent,
    NavbarSuperiorComponent,

    // Módulos de Angular Material
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatExpansionModule,
  ],
  templateUrl: './adres.component.html',
  styleUrls: ['./adres.component.css']
})
export class AdresComponent {
  // Datos de los selectores de departamento y municipio (ejemplo)
  departamentos = ['Cundinamarca', 'Antioquia', 'Valle del Cauca'];
  municipios = ['Bogotá', 'Medellín', 'Cali'];
  pdfNombre: string | null = null;
  documentoForm: FormGroup;


  // Utilizar ViewChild para referenciar el input de archivo
  @ViewChild('documentoInput') documentoInput!: ElementRef;

  // Constructor del componente
  constructor(
    private antecedentesService: AntecedentesService,
    private router: Router,
    private homeService: HomeService
  ) {
    // Inicializamos el formulario con dos campos: tipoDocumento y numeroDocumento
    this.documentoForm = new FormGroup({
      tipoDocumento: new FormControl(''),  // Select de tipo de documento
      numeroDocumento: new FormControl('')  // Input para número de documento
    });
  }

  // Formulario reactivo
  adresForm = new FormGroup({
    departamento: new FormControl('',),
    municipio: new FormControl('',),
    estado: new FormControl('',),
    entidad: new FormControl('',),
    regimen: new FormControl('',),
    fechaAfiliacionEfectiva: new FormControl('',),
    fechaFinalizacionAfiliacion: new FormControl(''),
    tipoAfiliacion: new FormControl('',),
    fechaAdress: new FormControl('',),
    pdfDocumento: new FormControl(null),
    title: new FormControl('')
  });

  // Método para manejar la selección de archivo
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.pdfNombre = file.name;
      this.adresForm.patchValue({
        pdfDocumento: file,
        title: file.name  // Actualizar el campo title con el nombre del archivo
      });
      this.adresForm.get('pdfDocumento')?.updateValueAndValidity();
      this.adresForm.get('title')?.updateValueAndValidity();
    }
  }

  // Método para simular clic en el input de archivo
  seleccionarArchivo() {
    this.documentoInput.nativeElement.click();
  }

  // Método para cargar la información del formulario
  cargarInformacion() {
    if (this.adresForm.valid) {
      // Mostrar Swal de carga
      Swal.fire({
        title: 'Cargando',
        text: 'Por favor espera mientras se carga la información...',
        icon: 'info',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();  // Mostrar spinner de carga
        }
      });

      // Llamada al servicio
      this.antecedentesService.cargarAdres(this.adresForm.value).subscribe(
        response => {
          Swal.close();  // Cerrar el Swal de carga al recibir la respuesta
          Swal.fire({
            title: 'Información cargada',
            text: 'La información ha sido cargada correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
        },
        error => {
          Swal.close();  // Cerrar el Swal de carga al recibir un error
          console.error(error);
          Swal.fire({
            title: 'Error',
            text: 'Ha ocurrido un error al cargar la información',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor completa todos los campos del formulario',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  // Método para manejar el evento del botón de búsqueda
  buscar() {
    const tipoDocumento = this.documentoForm.get('tipoDocumento')?.value;
    const numeroDocumento = this.documentoForm.get('numeroDocumento')?.value;

    console.log(`Tipo de Documento: ${tipoDocumento}`);
    console.log(`Número de Documento: ${numeroDocumento}`);

    this.homeService.traerInformacionContratacion(numeroDocumento).subscribe(
      (data) => {
        console.log(data);
        // Guardar operario con tipoDocumento, numeroDocumento y data.codigo_contrato
        localStorage.setItem('operario', JSON.stringify({
          tipoDocumento,
          numeroDocumento,
          codigoContrato: data.codigo_contrato
        }));
        // Swal de éxito
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Información cargada correctamente',
          confirmButtonText: 'Aceptar'
        });
      },
      (error) => {
        // Aquí manejamos el error
        console.error('Error al obtener la información:', error.message);
        if (error.message === 'El documento no fue encontrado') {
          // Puedes mostrar un mensaje personalizado al usuario
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El documento no fue encontrado.'
          });
          return;
        }
        // Puedes mostrar el error al usuario mediante una alerta, snackbar, o cualquier otra opción
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al obtener la información.'
        });
      }
    );
  }

}
