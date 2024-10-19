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
  selector: 'app-contraloria',
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
  templateUrl: './contraloria.component.html',
  styleUrl: './contraloria.component.css'
})
export class ContraloriaComponent {
  pdfNombreControlaria: string | null = null;
  documentoForm: FormGroup;

  // Utilizar ViewChild para referenciar el input de archivo
  @ViewChild('documentoInputControlaria') documentoInputControlaria!: ElementRef;

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
  ControlariaForm = new FormGroup({
    estadoControlaria: new FormControl('', Validators.required),
    fechaControlaria: new FormControl('', Validators.required),
    title: new FormControl(''),
    pdfControlaria: new FormControl(null),
  });

  // Método para manejar la selección de archivo
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.pdfNombreControlaria = file.name;
      this.ControlariaForm.patchValue({
        pdfControlaria: file,
        title: file.name  // Actualizar el campo title con el nombre del archivo
      });
      this.ControlariaForm.patchValue({ pdfControlaria: file });
      this.ControlariaForm.get('pdfControlaria')?.updateValueAndValidity();
    }
  }

  // Método para simular clic en el input de archivo
  seleccionarArchivo() {
    this.documentoInputControlaria.nativeElement.click();
  }

  // Método para cargar la información del formulario
  cargarInformacionControlaria() {
    if (this.ControlariaForm.valid) {
      console.log("Información del formulario Controlaria:", this.ControlariaForm.value);

      // Mostrar el Swal de carga antes de la solicitud
      Swal.fire({
        title: 'Cargando...',
        icon: 'info',
        text: 'Por favor, espera mientras se carga la información',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Realizar la solicitud al backend
      this.antecedentesService.cargarControlaria(this.ControlariaForm.value).subscribe(
        (response) => {
          console.log("Respuesta del servidor:", response);

          // Cerrar el Swal de carga y mostrar el mensaje de éxito con botón de confirmación
          Swal.fire({
            icon: 'success',
            title: 'Formulario Controlaria cargado',
            text: 'La información del formulario Controlaria se ha cargado correctamente',
            confirmButtonText: 'Aceptar'  // Mostrar botón "Aceptar"
          }).then((result) => {
            if (result.isConfirmed) {
              // Redirigir cuando el usuario haga clic en "Aceptar"
              this.router.navigate(['/home']);
            }
          });
        },
        (error) => {
          console.error("Error al cargar el formulario Controlaria:", error);

          // Cerrar el Swal de carga y mostrar el mensaje de error
          Swal.fire({
            icon: 'error',
            title: 'Error al cargar el formulario Controlaria',
            text: 'Se ha producido un error al cargar la información del formulario Controlaria',
          });
        }
      );
    } else {
      console.log("Formulario Controlaria inválido");
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