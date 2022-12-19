import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartaSComponent } from './carta-s/carta-s.component';
import { ContactosComponent } from './contactos/contactos.component';
import { HijosComponent } from './hijos/hijos.component';
import { InicioComponent } from './inicio/inicio.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { TiendaComponent } from './tienda/tienda.component';

const routes: Routes = [
{ path: '', redirectTo: '/inicio', pathMatch: 'full' },
{ path: 'inicio', component: InicioComponent },
{ path: 'contacto', component: ContactosComponent },
{ path: 'tienda', component: TiendaComponent },
{ path: 'preguntas', component: PreguntasComponent },
{ path: 'hacerCarta', component: CartaSComponent },
{ path: 'hijos', component: HijosComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
