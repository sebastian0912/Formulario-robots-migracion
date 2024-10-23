import { Component, OnInit } from '@angular/core';
import { NavbarLateralComponent } from '../../components/navbar-lateral/navbar-lateral.component';
import { NavbarSuperiorComponent } from '../../components/navbar-superior/navbar-superior.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SolicitudesRobotsService } from '../../services/solicitudes-robots/solicitudes-robots.service';
import { CommonModule, NgClass, NgFor } from '@angular/common';


@Component({
  selector: 'app-informe-consulta',
  standalone: true,
  imports: [
    NavbarLateralComponent,
    NavbarSuperiorComponent,
    MatFormFieldModule,
    NgClass,
    NgFor,
    CommonModule
  ],
  templateUrl: './informe-consulta.component.html',
  styleUrl: './informe-consulta.component.css'
})

export class InformeConsultaComponent implements OnInit {
  dataGenerales: any = {};
  dataPorOficina: any[] = [];
  threshold: number = 100; // Define aquí el valor del umbral

  constructor(private solicitudesRobotsService: SolicitudesRobotsService) {}

  ngOnInit(): void {
    this.solicitudesRobotsService.consultarEstadosRobotsPendientesGenerales().subscribe(
      (data: any) => {
        this.dataGenerales = data;
      },
      (error: any) => {
        console.error(error);
      }
    );

    this.solicitudesRobotsService.consultarEstadosRobotsPendientesPorOficina().subscribe(
      (data: any) => {
        this.dataPorOficina = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
