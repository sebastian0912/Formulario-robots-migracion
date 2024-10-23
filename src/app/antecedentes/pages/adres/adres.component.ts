import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { jsPDF } from 'jspdf'; // Importar jsPDF para convertir imágenes a PDF

@Component({
  selector: 'app-adres',
  standalone: true,
  imports: [
    NavbarLateralComponent,
    NavbarSuperiorComponent,
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
  departamentos = ['Cundinamarca', 'Antioquia', 'Valle del Cauca'];
  municipios = ['Bogotá', 'Medellín', 'Cali'];
  pdfNombre: string | null = null;
  documentoForm!: FormGroup;

  adresForm = new FormGroup({
    tipoDocumento: new FormControl('', Validators.required),
    numeroDocumento: new FormControl('', Validators.required),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    departamento: new FormControl(''),
    municipio: new FormControl(''),
    estado: new FormControl(''),
    entidad: new FormControl(''),
    regimen: new FormControl(''),
    fechaAfiliacionEfectiva: new FormControl(''),
    fechaFinalizacionAfiliacion: new FormControl(''),
    tipoAfiliacion: new FormControl(''),
    fechaAdress: new FormControl(''),
    pdfDocumento: new FormControl<File | null>(null),  // Permitir que sea un archivo o null
    title: new FormControl('')
  });

  @ViewChild('documentoInput') documentoInput!: ElementRef;

  // Constructor del componente
  constructor(
    private antecedentesService: AntecedentesService,
    private router: Router,
    private homeService: HomeService
  ) {
    // Inicializamos el formulario de documento
    this.documentoForm = new FormGroup({
      tipoDocumento: new FormControl('', Validators.required),
      numeroDocumento: new FormControl('', Validators.required)
    });

    // Inicializamos el formulario de adres
    this.adresForm = new FormGroup({
      tipoDocumento: new FormControl('', Validators.required),
      numeroDocumento: new FormControl('', Validators.required),
      nombre: new FormControl('',),
      apellido: new FormControl('',),
      departamento: new FormControl('',),
      municipio: new FormControl('',),
      estado: new FormControl('',),
      entidad: new FormControl('',),
      regimen: new FormControl('',),
      fechaAfiliacionEfectiva: new FormControl('',),
      fechaFinalizacionAfiliacion: new FormControl('',),
      tipoAfiliacion: new FormControl('',),
      fechaAdress: new FormControl('',),
      pdfDocumento: new FormControl<File | null>(null,),
      title: new FormControl('',)
    });

  }


  // Método para manejar la selección de archivo
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        this.convertImageToPdf(file);
      } else {
        this.adresForm.patchValue({
          pdfDocumento: file,
          title: file.name
        });
        this.adresForm.get('pdfDocumento')?.updateValueAndValidity();
        this.adresForm.get('title')?.updateValueAndValidity();
        this.pdfNombre = file.name;
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

      this.adresForm.patchValue({
        pdfDocumento: pdfFile,
        title: pdfFile.name
      });
      this.adresForm.get('pdfDocumento')?.updateValueAndValidity();
      this.adresForm.get('title')?.updateValueAndValidity();
      this.pdfNombre = pdfFile.name;
    };

    reader.readAsDataURL(file);
  }

  seleccionarArchivo() {
    this.documentoInput.nativeElement.click();
  }

  cargarInformacion() {
    if (this.adresForm.valid) {
      Swal.fire({
        title: 'Cargando',
        text: 'Por favor espera mientras se carga la información...',
        icon: 'info',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      this.antecedentesService.cargarAdres(this.adresForm.value).subscribe(
        response => {
          console.log(response);
          Swal.close();
          Swal.fire({
            title: 'Información cargada',
            text: 'La información ha sido cargada correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/adres']);
            });
          });
        },
        error => {
          console.error(error);
          Swal.close();
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
