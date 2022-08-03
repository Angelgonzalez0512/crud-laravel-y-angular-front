import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { InscriptionsComponent } from './inscriptions.component';
import { CreateInscriptionComponent } from './create-inscription/create-inscription.component';
import { EditInscripcionComponent } from './edit-inscripcion/edit-inscripcion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InscriptionsComponent,
    CreateInscriptionComponent,
    EditInscripcionComponent
  ],
  imports: [
    CommonModule,
    InscriptionsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class InscriptionsModule { }
