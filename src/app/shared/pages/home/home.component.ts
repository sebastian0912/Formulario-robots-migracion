import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';
import { SolicitudesRobotsService } from '../../services/solicitudes-robots/solicitudes-robots.service';
import { NavbarLateralComponent } from '../../components/navbar-lateral/navbar-lateral.component';
import { NavbarSuperiorComponent } from '../../components/navbar-superior/navbar-superior.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarLateralComponent,
    NavbarSuperiorComponent,
    MatCardModule,
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  displayedColumns: string[] = [
    'hora_registro', 'oficina', 'cedula', 'tipo_documento',
    'estado_adress', 'apellido_adress', 'entidad_adress', 'pdf_adress', 'fecha_adress',
    'estado_policivo', 'anotacion_policivo', 'pdf_policivo',
    'estado_ofac', 'anotacion_ofac', 'pdf_ofac',
    'estado_contraloria', 'anotacion_contraloria', 'pdf_contraloria',
    'estado_sisben', 'tipo_sisben', 'pdf_sisben', 'fecha_sisben',
    'estado_procuraduria', 'anotacion_procuraduria', 'pdf_procuraduria',
    'estado_fondo_pension', 'entidad_fondo_pension', 'pdf_fondo_pension', 'fecha_fondo_pension',
    'estado_union', 'union_pdf', 'fecha_union_pdf'
  ];

  displayedColumns2: string[] = [
    'hora_registro', 'oficina', 'cedula', 'tipo_documento',
    'estado_adress', 'apellido_adress', 'entidad_adress', 'pdf_adress', 'fecha_adress',
    'estado_policivo', 'anotacion_policivo', 'pdf_policivo',
    'estado_ofac', 'anotacion_ofac', 'pdf_ofac',
    'estado_contraloria', 'anotacion_contraloria', 'pdf_contraloria',
    'estado_sisben', 'tipo_sisben', 'pdf_sisben', 'fecha_sisben',
    'estado_procuraduria', 'anotacion_procuraduria', 'pdf_procuraduria',
    'estado_fondo_pension', 'entidad_fondo_pension', 'pdf_fondo_pension', 'fecha_fondo_pension',
    'estado_union', 'union_pdf', 'fecha_union_pdf'
  ];
  dataSource = new MatTableDataSource<any>([]);
  dataSource2 = new MatTableDataSource<any>([]);
  estados = ['Pendiente', 'Aprobado', 'Rechazado']; // Lista de estados posibles

  // FormControls para los filtros
  contratoControl = new FormControl('');
  oficinaControl = new FormControl('');
  cedulaControl = new FormControl('');
  selectedStateFieldControl = new FormControl('');
  selectedStateValueControl = new FormControl('');

  // Almacena el valor de cada filtro
  filterValues: any = {
    contrato: '',
    oficina: '',
    cedula: '',
    estado: '',
  };


  constructor(
    private solicitudesRobotsService: SolicitudesRobotsService
  ) { }

  async ngOnInit(): Promise<void> {

    try {
      const data = await this.solicitudesRobotsService.consultarEstadosRobots().toPromise();

      console.log(data.sin_consultar[34]);


      this.dataSource.data = data.sin_consultar.map((item: any) => ({
        paquete: item.paquete,
        oficina: item.oficina,
        cedula: item.cedula,
        tipo_documento: item.tipo_documento,
        estado_adress: item.estado_adress,
        apellido_adress: item.apellido_adress,
        entidad_adress: item.entidad_adress,
        pdf_adress: item.pdf_adress,
        fecha_adress: item.fecha_adress,
        estado_policivo: item.estado_policivo,
        anotacion_policivo: item.anotacion_policivo,
        pdf_policivo: item.pdf_policivo,
        estado_ofac: item.estado_ofac,
        anotacion_ofac: item.anotacion_ofac,
        pdf_ofac: item.pdf_ofac,
        estado_contraloria: item.estado_contraloria,
        anotacion_contraloria: item.anotacion_contraloria,
        pdf_contraloria: item.pdf_contraloria,
        estado_sisben: item.estado_sisben,
        tipo_sisben: item.tipo_sisben,
        pdf_sisben: item.pdf_sisben,
        fecha_sisben: item.fecha_sisben,
        estado_procuraduria: item.estado_procuraduria,
        anotacion_procuraduria: item.anotacion_procuraduria,
        pdf_procuraduria: item.pdf_procuraduria,
        estado_fondo_pension: item.estado_fondo_pension,
        entidad_fondo_pension: item.entidad_fondo_pension,
        pdf_fondo_pension: item.pdf_fondo_pension,
        fecha_fondo_pension: item.fecha_fondo_pension,
        estado_union: item.estado_union,
        union_pdf: item.union_pdf,
        fecha_union_pdf: item.fecha_union_pdf
      }));
      this.dataSource2.data = data.con_registros.map((item: any) => ({
        paquete: item.paquete,
        oficina: item.oficina,
        cedula: item.cedula,
        tipo_documento: item.tipo_documento,
        estado_adress: item.estado_adress,
        apellido_adress: item.apellido_adress,
        entidad_adress: item.entidad_adress,
        pdf_adress: item.pdf_adress,
        fecha_adress: item.fecha_adress,
        estado_policivo: item.estado_policivo,
        anotacion_policivo: item.anotacion_policivo,
        pdf_policivo: item.pdf_policivo,
        estado_ofac: item.estado_ofac,
        anotacion_ofac: item.anotacion_ofac,
        pdf_ofac: item.pdf_ofac,
        estado_contraloria: item.estado_contraloria,
        anotacion_contraloria: item.anotacion_contraloria,
        pdf_contraloria: item.pdf_contraloria,
        estado_sisben: item.estado_sisben,
        tipo_sisben: item.tipo_sisben,
        pdf_sisben: item.pdf_sisben,
        fecha_sisben: item.fecha_sisben,
        estado_procuraduria: item.estado_procuraduria,
        anotacion_procuraduria: item.anotacion_procuraduria,
        pdf_procuraduria: item.pdf_procuraduria,
        estado_fondo_pension: item.estado_fondo_pension,
        entidad_fondo_pension: item.entidad_fondo_pension,
        pdf_fondo_pension: item.pdf_fondo_pension,
        fecha_fondo_pension: item.fecha_fondo_pension,
        estado_union: item.estado_union,
        union_pdf: item.union_pdf,
        fecha_union_pdf: item.fecha_union_pdf
      }));

      this.dataSource2.filterPredicate = this.createFilter();
      this.subscribeToFilters();

    } catch (error: any) {
      const errorMessage = error?.error?.message || 'Ocurrió un error desconocido';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim();
    this.dataSource.filter = filterValue;
  }

  subscribeToFilters(): void {
    this.contratoControl.valueChanges.subscribe(value => {
      this.filterValues.contrato = value!.trim().toLowerCase();
      this.applyFilters();
    });
    this.oficinaControl.valueChanges.subscribe(value => {
      this.filterValues.oficina = value!.trim().toLowerCase();
      this.applyFilters();
    });
    this.cedulaControl.valueChanges.subscribe(value => {
      this.filterValues.cedula = value!.trim().toLowerCase();
      this.applyFilters();
    });
    this.selectedStateFieldControl.valueChanges.subscribe(() => this.applyFilters());
    this.selectedStateValueControl.valueChanges.subscribe(() => this.applyFilters());
  }

  applyFilters(): void {
    const selectedField = this.selectedStateFieldControl.value;
    const selectedValue = this.selectedStateValueControl.value;

    // Actualizar el filtro del campo de estado seleccionado
    if (selectedField) {
      this.filterValues[selectedField] = selectedValue ? selectedValue.trim().toLowerCase() : '';
    }

    this.dataSource2.filter = JSON.stringify(this.filterValues);
  }

  createFilter(): (data: any, filter: string) => boolean {
    return (data, filter): boolean => {
      const searchTerms = JSON.parse(filter);
      return (
        (!searchTerms.contrato || data.tipo_documento.toLowerCase().includes(searchTerms.contrato)) &&
        (!searchTerms.oficina || data.oficina.toLowerCase().includes(searchTerms.oficina)) &&
        (!searchTerms.cedula || data.cedula.toLowerCase().includes(searchTerms.cedula)) &&
        (!this.selectedStateFieldControl.value || !this.selectedStateValueControl.value ||
          (data[this.selectedStateFieldControl.value]?.toLowerCase() === this.selectedStateValueControl.value.toLowerCase()))
      );
    };
  }
}


