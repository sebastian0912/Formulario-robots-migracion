import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormArray, FormBuilder, } from '@angular/forms';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateRangeDialogComponent } from '../../../shared/components/date-rang-dialog/date-rang-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-union-pdf',
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
    MatCheckboxModule,
    MatDialogModule,
  ],
  templateUrl: './union-pdf.component.html',
  styleUrl: './union-pdf.component.css',

})
export class UnionPdfComponent {
  checkboxForm!: FormGroup;
  checkboxList = [
    { key: 5, descripcion: 'AFP' },
    { key: 6, descripcion: 'ADRES' },
    { key: 7, descripcion: 'OFAC' },
    { key: 8, descripcion: 'POLICIVOS' },
    { key: 9, descripcion: 'PROCURADURIA' },
    { key: 10, descripcion: 'CONTRALORIA' },
    { key: 11, descripcion: 'MEDIDAS CORRECTIVAS' },
    { key: 12, descripcion: 'RAMA JUDICIAL' },
    { key: 13, descripcion: 'SISBEN' }
  ];

  selectedOrder: number[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private antecedentesService: AntecedentesService,
  ) {
    // Creamos un FormArray para los checkboxes
    this.checkboxForm = this.fb.group({
      selectedItems: this.fb.array(this.checkboxList.map(() => new FormControl(false)))
    });
  }

  // Obtenemos el array de los checkboxes
  get selectedItemsArray() {
    return this.checkboxForm.get('selectedItems') as FormArray;
  }

  // Maneja la selección y deselección de checkboxes
  onCheckboxChange(index: number) {
    const isChecked = this.selectedItemsArray.at(index).value;

    if (isChecked) {
      // Cuando el checkbox se selecciona, agregamos la 'key' a selectedOrder
      this.selectedOrder.push(this.checkboxList[index].key);
    } else {
      // Cuando se deselecciona, eliminamos la 'key' de selectedOrder
      this.selectedOrder = this.selectedOrder.filter(key => key !== this.checkboxList[index].key);
    }
  }

  // Al hacer submit, se imprime el orden de las 'keys' seleccionadas
  onSubmit() {
    console.log(this.selectedOrder);  // Imprime el orden de las 'keys' seleccionadas
    
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de generar los enlaces de los PDF de las últimas 3 semanas',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, generar enlaces'
    }).then((result) => {
      if (result.isConfirmed) {
        // Abre el modal de rango de fechas
        const dialogRef = this.dialog.open(DateRangeDialogComponent, {
          width: '400px',
          data: { selectedOrder: this.selectedOrder } // Pasa el orden seleccionado como datos si es necesario
        });
  
        // Maneja el resultado del modal
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log(result);
            // Llama al servicio para combinar documentos
            this.antecedentesService.combinarDocumentos(this.selectedOrder, result.start, result.end).subscribe((response: Blob) => {
              // Crear un enlace para descargar el archivo
              const url = window.URL.createObjectURL(response);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'registros_afectados.xlsx';  // Nombre del archivo a descargar
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);
  
              Swal.fire(
                '¡Enlaces generados!',
                'Los enlaces de los PDF han sido generados con éxito',
                'success'
              );
            });
          }
        });
      }
    });
  }
  

}
