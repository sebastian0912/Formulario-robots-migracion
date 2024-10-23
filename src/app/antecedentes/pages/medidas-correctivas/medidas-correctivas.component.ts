import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NavbarLateralComponent } from '../../../shared/components/navbar-lateral/navbar-lateral.component';
import { NavbarSuperiorComponent } from '../../../shared/components/navbar-superior/navbar-superior.component';
import Swal from 'sweetalert2';
import { AntecedentesService } from '../../../shared/services/antecedentes/antecedentes.service';
import { HomeService } from '../../../shared/services/home/home.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-medidas-correctivas',
  standalone: true,
  imports: [
    NavbarLateralComponent,
    NavbarSuperiorComponent,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './medidas-correctivas.component.html',
  styleUrls: ['./medidas-correctivas.component.css']
})
export class MedidasCorrectivasComponent {
  pdfNombreMedidas: string | null = null;

  @ViewChild('documentoInputMedidas') documentoInputMedidas!: ElementRef;

  constructor(
    private antecedentesService: AntecedentesService,
    private router: Router,
    private homeService: HomeService
  ) {}

  // Formulario reactivo para medidas correctivas
  medidasCorrectivasForm = new FormGroup({
    tipoDocumento: new FormControl('', Validators.required),
    numeroDocumento: new FormControl('', Validators.required),
    expediente: new FormControl('', Validators.required),
    formato: new FormControl('', Validators.required),
    idInfractor: new FormControl('', Validators.required),
    infractor: new FormControl('', Validators.required),
    idCustodio: new FormControl('', Validators.required),
    custodio: new FormControl('', Validators.required),
    nit: new FormControl('', Validators.required),
    razonSocial: new FormControl('', Validators.required),
    idRepresentante: new FormControl('', Validators.required),
    representante: new FormControl('', Validators.required),
    fechaMedidasCorrectivas: new FormControl('', Validators.required),
    departamentoMedidasCorrectivas: new FormControl('', Validators.required),
    municipioMedidasCorrectivas: new FormControl('', Validators.required),
    apelacion: new FormControl('', Validators.required),
    estadoMedidasCorrectivas: new FormControl('', Validators.required),
    articulo: new FormControl('', Validators.required),
    numeral: new FormControl('', Validators.required),
    literal: new FormControl('', Validators.required),
    localidad: new FormControl('', Validators.required),
    relatoHechos: new FormControl('', Validators.required),
    descargos: new FormControl('', Validators.required),
    numeroDeMedidasCorrectivas: new FormControl('', Validators.required),
    title: new FormControl(''),
    pdfMedidas: new FormControl<File | null>(null),
  });

  // Método para manejar la selección de archivo
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        this.convertImageToPdf(file);
      } else {
        this.pdfNombreMedidas = file.name;
        this.medidasCorrectivasForm.patchValue({
          pdfMedidas: file,
          title: file.name
        });
        this.medidasCorrectivasForm.get('pdfMedidas')?.updateValueAndValidity();
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

      this.medidasCorrectivasForm.patchValue({
        pdfMedidas: pdfFile,
        title: pdfFile.name
      });

      this.medidasCorrectivasForm.get('pdfMedidas')?.updateValueAndValidity();
      this.pdfNombreMedidas = pdfFile.name;
    };

    reader.readAsDataURL(file);
  }

  // Método para simular clic en el input de archivo
  seleccionarArchivo() {
    this.documentoInputMedidas.nativeElement.click();
  }

  // Método para cargar la información del formulario
  cargarInformacionMedidas() {
    if (this.medidasCorrectivasForm.valid) {
      console.log("Información del formulario Medidas Correctivas:", this.medidasCorrectivasForm.value);

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
      this.antecedentesService.cargarMedidasCorrectivas(this.medidasCorrectivasForm.value).subscribe(
        (response) => {
          console.log("Respuesta del servidor:", response);

          // Cerrar el Swal de carga y mostrar el mensaje de éxito con botón de confirmación
          Swal.fire({
            icon: 'success',
            title: 'Formulario Medidas Correctivas cargado',
            text: 'La información del formulario de Medidas Correctivas se ha cargado correctamente',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/medidas-correctivas']);
            });
          });
        },
        (error) => {
          console.error("Error al cargar el formulario de Medidas Correctivas:", error);

          // Cerrar el Swal de carga y mostrar el mensaje de error
          Swal.fire({
            icon: 'error',
            title: 'Error al cargar el formulario de Medidas Correctivas',
            text: 'Se ha producido un error al cargar la información del formulario de Medidas Correctivas',
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
