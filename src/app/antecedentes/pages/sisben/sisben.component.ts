import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
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
export class SisbenComponent implements OnInit {
  pdfNombreSisben: string | null = null;

  // Utilizar ViewChild para referenciar el input de archivo
  @ViewChild('documentoInputSisben') documentoInputSisben!: ElementRef;

  // Opciones de SISBÉN
  sisbenOptions: string[] = [
    'A1', 'A2', 'A3', 'A4', 'A5', // Grupo A
    'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', // Grupo B
    'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12', 'C13', 'C14', 'C15', 'C16', 'C17', 'C18', // Grupo C
    'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'D14', 'D15', 'D16', 'D17', 'D18', 'D19', 'D20', 'D21' // Grupo D
  ];

  // Opciones filtradas
  filteredOptions!: Observable<string[]>;

  constructor(
    private antecedentesService: AntecedentesService,
    private router: Router
  ) { }

  // Formulario reactivo para SISBÉN
  SisbenForm = new FormGroup({
    tipo_sisben: new FormControl('', Validators.required), // Control de tipo de SISBÉN
    estado_sisben: new FormControl({ value: '', disabled: true }, Validators.required), // Control de estado de SISBÉN
    pdfSisben: new FormControl(null, Validators.required) // Control para archivo PDF
  });

  ngOnInit() {
    // Aplicar el filtro dinámico en el campo 'tipo_sisben'
    this.filteredOptions = this.SisbenForm.controls.tipo_sisben.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    // Cambiar el estado de SISBÉN automáticamente según el tipo
    this.SisbenForm.controls.tipo_sisben.valueChanges.subscribe(value => {
      if (value) {
        let estado = '';
        switch (value.charAt(0)) {
          case 'A':
            estado = 'Pobreza extrema';
            break;
          case 'B':
            estado = 'Pobreza moderada';
            break;
          case 'C':
            estado = 'Vulnerabilidad';
            break;
          case 'D':
            estado = 'Ni pobre ni vulnerable';
            break;
          default:
            estado = 'Estado desconocido';
        }
        // Establecer el estado automáticamente
        this.SisbenForm.controls.estado_sisben.setValue(estado);
      }
    });
  }

  // Método para manejar la selección de archivo
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.pdfNombreSisben = file.name;
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

  // Método para filtrar las opciones
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.sisbenOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
}