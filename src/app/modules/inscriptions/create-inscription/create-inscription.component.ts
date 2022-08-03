import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from "moment";
import { InscriptionService } from 'src/app/core/services/inscription.service';
@Component({
  selector: 'app-create-inscription',
  templateUrl: './create-inscription.component.html',
  styleUrls: ['./create-inscription.component.scss']
})
export class CreateInscriptionComponent implements OnInit {
  fcreate: FormGroup;
  error_message = "";
  constructor(private fb: FormBuilder, private router: Router, private dp: DatePipe, private inscriptionService: InscriptionService) {
    this.fcreate = this.fb.group({
      name: ['', [Validators.required, this.validateName]],
      age: ['', [Validators.required, this.validateAge]],
      birthdate: ['', [Validators.required, this.validateBirthDate]],
      price: ['', [Validators.required]],
      inscription_date: ['', [Validators.required, this.validateInscriptionDate]],
    });
  }

  ngOnInit(): void {

  }
  private validateName(control: AbstractControl) {
    const name = control.value;
    let error = {};
    if (name) {
      let array = name.split(" ");
      if (array.length > 2 || array.length < 2) {
        error = { ...error, lengthname: "El nombre no puede tener mas de 2 palabras" };

      }

      if (array.length == 2) {
        if (array[0].length > 4 || array[1].length > 4 || array[0].length < 4 || array[1].length < 4) {
          error = { ...error, lengthnamecharacter: "El nombre no puede tener menos de 3 letras" };
        }
      }
    }
    return error;
  }
  private validateAge(control: AbstractControl) {
    const age = control.value;
    let error = {};
    if (age) {
      if (age < 18) {
        error = { ...error, minage: "El usuario debe ser mayor de 18 años" };
      }
      /*  */
    }
    return error;
  }
  private validateBirthDate(control: AbstractControl) {
    const birthdate = control.value;
    let error = {};
    if (birthdate) {
      if (!moment().diff(birthdate, 'days') || moment().diff(birthdate, 'years') < 18) {
        error = { ...error, datevalid: "Seleccione una fecha de nacimiento valida" };
      }
    }
    return error;
  }
  private validateInscriptionDate(control: AbstractControl) {
    const inscription_date = control.value;
    let error = {};
    if (inscription_date) {
      if (!moment().diff(inscription_date, 'days')) {
        error = { ...error, datevalid: "Seleccione una fecha de nacimiento valida" };
      }
    }
    return error;
  }
  createInscription() {

    if (this.fcreate.valid) {
      let date = this.fcreate.value.birthdate;
      let amount = this.fcreate.value.price;
      let inscription_date = this.fcreate.value.inscription_date;
      let ageandbithday = true;
      let inscripcionandprice = true;
      if (date) {
        if (moment().diff(moment(date), 'years') != this.fcreate.value.age) {
          console.log(moment().diff(moment(date), 'years'));
          ageandbithday = false;
        }
      }
      if (inscription_date) {
        let years = moment().diff(moment(inscription_date), 'years');
        
        years == 0 ? years = 1 : years = years;
        console.log(years);
        let montoapagar = years * 100;
        if (montoapagar != amount) {
          inscripcionandprice = false;
        }
      }

      if (ageandbithday && inscripcionandprice) {
        this.inscriptionService.create(this.fcreate.value).subscribe(data => {
          console.log(data);
          if (data.success) {
            this.router.navigate(['/']);
          }
        });
      } else {
        this.error_message = "Los datos no coinciden revise que la fecha de nacimiento y la fecha de inscripcion coincidan con el pago y su edad";
      }
    }

  }
  public getError(controlName: string): any {
    let error: any = {};
    const control = this.fcreate.get(controlName);
    if (control) {
      if (control.touched && control.errors != null) {
        error = control.errors;
      }
    }
    return error;
  }
}
