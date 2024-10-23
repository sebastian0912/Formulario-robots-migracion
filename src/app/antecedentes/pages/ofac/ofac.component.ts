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
import jsPDF from 'jspdf';

@Component({
  selector: 'app-ofac',
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
  templateUrl: './ofac.component.html',
  styleUrls: ['./ofac.component.css']
})
export class OfacComponent {
  pdfNombreOfac: string | null = null;

  // Utilizar ViewChild para referenciar el input de archivo
  @ViewChild('documentoInputOfac') documentoInputOfac!: ElementRef;

  constructor(
    private antecedentesService: AntecedentesService,
    private router: Router,
    private homeService: HomeService
  ) {}

  // Formulario reactivo
  ofacForm = new FormGroup({
    tipoDocumento: new FormControl('', Validators.required),  
    numeroDocumento: new FormControl('', Validators.required),  
    estadoOfac: new FormControl('', Validators.required),
    fechaOfac: new FormControl('', Validators.required),
    pdfOfac: new FormControl<File | null>(null),
    title: new FormControl('')
  });

  // Método para manejar la selección de archivo
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        this.convertImageToPdf(file);
      } else {
        this.pdfNombreOfac = file.name;
        this.ofacForm.patchValue({
          pdfOfac: file,
          title: file.name
        });
        this.ofacForm.get('pdfOfac')?.updateValueAndValidity();
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

      this.ofacForm.patchValue({
        pdfOfac: pdfFile,
        title: pdfFile.name
      });
      this.ofacForm.get('pdfOfac')?.updateValueAndValidity();
      this.pdfNombreOfac = pdfFile.name;
    };

    reader.readAsDataURL(file);
  }

  // Método para simular clic en el input de archivo
  seleccionarArchivo() {
    this.documentoInputOfac.nativeElement.click();
  }

  // Método para cargar la información del formulario
  cargarInformacionOfac() {
    if (this.ofacForm.valid) {
      console.log("Información del formulario OFAC:", this.ofacForm.value);

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
      this.antecedentesService.cargarOfac(this.ofacForm.value).subscribe(
        (response) => {
          console.log("Respuesta del servidor:", response);

          // Cerrar el Swal de carga y mostrar el mensaje de éxito con botón de confirmación
          Swal.fire({
            icon: 'success',
            title: 'Formulario OFAC cargado',
            text: 'La información del formulario OFAC se ha cargado correctamente',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/ofac']);
            });
          });
        },
        (error) => {
          console.error("Error al cargar el formulario OFAC:", error);

          // Cerrar el Swal de carga y mostrar el mensaje de error
          Swal.fire({
            icon: 'error',
            title: 'Error al cargar el formulario OFAC',
            text: 'Se ha producido un error al cargar la información del formulario OFAC',
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
