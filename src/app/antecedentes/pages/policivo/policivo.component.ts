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
  selector: 'app-policivo',
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
  templateUrl: './policivo.component.html',
  styleUrl: './policivo.component.css'
})
export class PolicivoComponent {
  pdfNombrePolicivo: string | null = null;

  // Utilizar ViewChild para referenciar el input de archivo
  @ViewChild('documentoInputPolicivo') documentoInputPolicivo!: ElementRef;

  constructor(
    private antecedentesService: AntecedentesService,
    private router: Router
  ) { }
  // Formulario reactivo
  policivoForm = new FormGroup({
    estadoPolicivo: new FormControl('', Validators.required),
    pdfPolicivo: new FormControl(null),
  });

  // Método para manejar la selección de archivo
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.pdfNombrePolicivo = file.name;
      this.policivoForm.patchValue({ pdfPolicivo: file });
      this.policivoForm.get('pdfPolicivo')?.updateValueAndValidity();
    }
  }

  // Método para simular clic en el input de archivo
  seleccionarArchivo() {
    this.documentoInputPolicivo.nativeElement.click();
  }

  // Método para cargar la información del formulario
  cargarInformacionPolicivo() {
    if (this.policivoForm.valid) {
      console.log("Información del formulario policivo:", this.policivoForm.value);
      
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
      this.antecedentesService.cargarPolicivo(this.policivoForm.value).subscribe(
        (response) => {
          console.log("Respuesta del servidor:", response);
  
          // Cerrar el Swal de carga y mostrar el mensaje de éxito con botón de confirmación
          Swal.fire({
            icon: 'success',
            title: 'Formulario policivo cargado',
            text: 'La información del formulario policivo se ha cargado correctamente',
            confirmButtonText: 'Aceptar'  // Mostrar botón "Aceptar"
          }).then((result) => {
            if (result.isConfirmed) {
              // Redirigir cuando el usuario haga clic en "Aceptar"
              this.router.navigate(['/home']);
            }
          });
        },
        (error) => {
          console.error("Error al cargar el formulario policivo:", error);
  
          // Cerrar el Swal de carga y mostrar el mensaje de error
          Swal.fire({
            icon: 'error',
            title: 'Error al cargar el formulario policivo',
            text: 'Se ha producido un error al cargar la información del formulario policivo',
          });
        }
      );
    } else {
      console.log("Formulario policivo inválido");
    }
  }
  
  
}