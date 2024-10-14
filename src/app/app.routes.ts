import { Routes } from '@angular/router';
import { LoginComponent } from './core/pages/login/login.component';
import { AdresComponent } from './antecedentes/pages/adres/adres.component';
import { ContraloriaComponent } from './antecedentes/pages/contraloria/contraloria.component';
import { FondoPensionComponent } from './antecedentes/pages/fondo-pension/fondo-pension.component';
import { OfacComponent } from './antecedentes/pages/ofac/ofac.component';
import { PolicivoComponent } from './antecedentes/pages/policivo/policivo.component';
import { ProcuraduriaComponent } from './antecedentes/pages/procuraduria/procuraduria.component';
import { SisbenComponent } from './antecedentes/pages/sisben/sisben.component';
import { HomeComponent } from './shared/pages/home/home.component';



export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'adres', component: AdresComponent },
    { path: 'contraloria', component: ContraloriaComponent },
    { path: 'fondo-pension', component: FondoPensionComponent },
    { path: 'ofac', component: OfacComponent },
    { path: 'policivo', component: PolicivoComponent },
    { path: 'procuraduria', component: ProcuraduriaComponent },
    { path: 'sisben', component: SisbenComponent },
];
