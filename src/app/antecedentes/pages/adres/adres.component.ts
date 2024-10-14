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

  // Utilizar ViewChild para referenciar el input de archivo
  @ViewChild('documentoInput') documentoInput!: ElementRef;

  // Constructor del componente
  constructor(
    private antecedentesService: AntecedentesService,
    private router: Router
  ) { }

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
          }).then(() => {
            this.router.navigate(['/home']);
          });
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

}
