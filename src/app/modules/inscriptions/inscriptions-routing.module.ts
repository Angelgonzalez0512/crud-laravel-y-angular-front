import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateInscriptionComponent } from './create-inscription/create-inscription.component';
import { EditInscripcionComponent } from './edit-inscripcion/edit-inscripcion.component';
import { InscriptionsComponent } from './inscriptions.component';

const routes: Routes = [
  { path: '', component: InscriptionsComponent },
  { path: "create", component: CreateInscriptionComponent },
  { path: "edit/:id", component: EditInscripcionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscriptionsRoutingModule { }
