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
    'paquete',
    'oficina',
    'cedula',
    'tipo_documento',
    'estado_adress',
    'estado_contraloria',
    'estado_fondo_pension',
    'estado_ofac',
    'estado_policivo',
    'estado_procuraduria',
    'estado_sisben',
    'estado_union'
  ];
  displayedColumns2: string[] = [
    'paquete',
    'oficina',
    'cedula',
    'tipo_documento',
    'estado_adress',
    'estado_contraloria',
    'estado_fondo_pension',
    'estado_ofac',
    'estado_policivo',
    'estado_procuraduria',
    'estado_sisben',
    'estado_union'
  ];
  dataSource = new MatTableDataSource<any>([]);
  dataSource2 = new MatTableDataSource<any>([]);
  estados = ['Pendiente', 'Aprobado', 'Rechazado']; // Lista de estados posibles
  selectedStateField: string = '';
  selectedStateValue: string = '';

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

      this.dataSource.data = data.sin_consultar.map((item: any) => ({
        paquete: item.paquete,
        oficina: item.oficina,
        cedula: item.cedula,
        tipo_documento: item.tipo_documento,
        estado_adress: item.estado_adress,
        apellido_adress: item.apellido_adress,
        estado_contraloria: item.estado_contraloria,
        estado_fondo_pension: item.estado_fondo_pension,
        estado_ofac: item.estado_ofac,
        estado_policivo: item.estado_policivo,
        estado_procuraduria: item.estado_procuraduria,
        estado_sisben: item.estado_sisben,
        estado_union: item.estado_union,
      }));
      this.dataSource2.data = data.con_registros.map((item: any) => ({
        paquete: item.paquete,
        oficina: item.oficina,
        cedula: item.cedula,
        tipo_documento: item.tipo_documento,
        estado_adress: item.estado_adress,
        apellido_adress: item.apellido_adress,
        estado_contraloria: item.estado_contraloria,
        estado_fondo_pension: item.estado_fondo_pension,
        estado_ofac: item.estado_ofac,
        estado_policivo: item.estado_policivo,
        estado_procuraduria: item.estado_procuraduria,
        estado_sisben: item.estado_sisben,
        estado_union: item.estado_union,
      }));
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
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyStateFilter(): void {
    if (this.selectedStateField) {
      this.filterValues[this.selectedStateField] = this.selectedStateValue.toLowerCase();
    } else {
      this.filterValues.estado = ''; // Reinicia el filtro si no hay un campo seleccionado
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
        (!this.selectedStateField || !this.selectedStateValue ||
          (data[this.selectedStateField]?.toLowerCase() === this.selectedStateValue.toLowerCase()))
      );
    };
  }

}
