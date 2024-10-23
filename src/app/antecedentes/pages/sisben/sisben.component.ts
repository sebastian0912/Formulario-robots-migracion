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
import Swal from 'sweetalert2';
import { NavbarLateralComponent } from '../../../shared/components/navbar-lateral/navbar-lateral.component';
import { NavbarSuperiorComponent } from '../../../shared/components/navbar-superior/navbar-superior.component';
import { AntecedentesService } from '../../../shared/services/antecedentes/antecedentes.service';
import { HomeService } from '../../../shared/services/home/home.service';
import jsPDF from 'jspdf';

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
  styleUrls: ['./sisben.component.css']
})
export class SisbenComponent {
  pdfNombreSisben: string | null = null;

  // Utilizar ViewChild para referenciar el input de archivo
  @ViewChild('documentoInputSisben') documentoInputSisben!: ElementRef;

  constructor(
    private antecedentesService: AntecedentesService,
    private router: Router,
    private homeService: HomeService
  ) { }

  // Formulario reactivo para SISBÉN
  SisbenForm = new FormGroup({
    tipoDocumento: new FormControl('', Validators.required),
    numeroDocumento: new FormControl('', Validators.required),
    tipo_sisben: new FormControl('', Validators.required),
    estado_sisben: new FormControl('', Validators.required),
    pdfSisben: new FormControl<File | null>(null),
    title: new FormControl(''),
    fechaSisben: new FormControl('', Validators.required)
  });

  // Método para manejar la selección de archivo
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        this.convertImageToPdf(file);
      } else {
        this.pdfNombreSisben = file.name;
        this.SisbenForm.patchValue({
          pdfSisben: file,
          title: file.name  // Actualizar el campo title con el nombre del archivo
        });
        this.SisbenForm.get('pdfSisben')?.updateValueAndValidity();
      }
    }
  }

  // Método para convertir una imagen a PDF
  convertImageToPdf(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const imageData = e.target.result;

      const pdf = new jsPDF();
      pdf.addImage(imageData, 'JPEG', 10, 10, 180, 160);

      const pdfBlob = pdf.output('blob');
      const pdfFile = new File([pdfBlob], `${file.name.split('.')[0]}.pdf`, { type: 'application/pdf' });

      this.SisbenForm.patchValue({
        pdfSisben: pdfFile,
        title: pdfFile.name
      });
      this.SisbenForm.get('pdfSisben')?.updateValueAndValidity();
      this.pdfNombreSisben = pdfFile.name;
    };

    reader.readAsDataURL(file);
  }

  // Método para simular clic en el input de archivo
  seleccionarArchivo() {
    this.documentoInputSisben.nativeElement.click();
  }

  // Método para cargar la información del formulario SISBÉN
  cargarInformacionSisben() {
    if (this.SisbenForm.valid) {
      console.log("Información del formulario SISBÉN:", this.SisbenForm.value);

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
            this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/sisben']);
            });
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
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: 'Por favor, completa todos los campos requeridos.',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}
