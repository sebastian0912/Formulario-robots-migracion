import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete'; // Necesario para autocomplete
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { NavbarLateralComponent } from '../../../shared/components/navbar-lateral/navbar-lateral.component';
import { NavbarSuperiorComponent } from '../../../shared/components/navbar-superior/navbar-superior.component';
import { AntecedentesService } from '../../../shared/services/antecedentes/antecedentes.service';
import { HomeService } from '../../../shared/services/home/home.service';

@Component({
  selector: 'app-sisben',
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
    MatAutocompleteModule, // Importar el módulo de autocomplete
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './sisben.component.html',
  styleUrl: './sisben.component.css'
})
export class SisbenComponent  {
  pdfNombreSisben: string | null = null;
  documentoForm: FormGroup;

  // Utilizar ViewChild para referenciar el input de archivo
  @ViewChild('documentoInputSisben') documentoInputSisben!: ElementRef;


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

  // Formulario reactivo para SISBÉN
  SisbenForm = new FormGroup({
    tipo_sisben: new FormControl('', Validators.required), // Control de tipo de SISBÉN
    estado_sisben: new FormControl('', Validators.required),
    pdfSisben: new FormControl(null, Validators.required), // Control para archivo PDF
    title: new FormControl(''),
    fechaSisben: new FormControl('', Validators.required)

  });

  // Método para manejar la selección de archivo
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.pdfNombreSisben = file.name;
      this.SisbenForm.patchValue({
        pdfSisben: file,
        title: file.name  // Actualizar el campo title con el nombre del archivo
      });
      this.SisbenForm.patchValue({ pdfSisben: file });
      this.SisbenForm.get('pdfSisben')?.updateValueAndValidity();
    }
  }

  // Método para simular clic en el input de archivo
  seleccionarArchivo() {
    this.documentoInputSisben.nativeElement.click();
  }

  // Método para cargar la información del formulario SISBÉN
  cargarInformacionSisben() {
    if (this.SisbenForm.valid) {
      // Habilitar el campo estado_sisben para incluirlo en la solicitud
      this.SisbenForm.controls.estado_sisben.enable();

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
      this.antecedentesService.cargarSisben(this.SisbenForm.value).subscribe(
        (response) => {
          console.log("Respuesta del servidor:", response);

          // Cerrar el Swal de carga y mostrar el mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: 'Formulario SISBÉN cargado',
            text: 'La información del formulario SISBÉN se ha cargado correctamente',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.isConfirmed) {
              // Redirigir cuando el usuario haga clic en "Aceptar"
              this.router.navigate(['/home']);
            }
          });
        },
        (error) => {
          console.error("Error al cargar el formulario SISBÉN:", error);

          // Cerrar el Swal de carga y mostrar el mensaje de error
          Swal.fire({
            icon: 'error',
            title: 'Error al cargar el formulario SISBÉN',
            text: 'Se ha producido un error al cargar la información del formulario SISBÉN',
          });
        }
      );
    } else {
      console.log("Formulario SISBÉN inválido");
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