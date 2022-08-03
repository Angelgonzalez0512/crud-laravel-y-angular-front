import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from "moment";
import { InscriptionService } from 'src/app/core/services/inscription.service';

@Component({
  selector: 'app-edit-inscripcion',
  templateUrl: './edit-inscripcion.component.html',
  styleUrls: ['./edit-inscripcion.component.scss']
})
export class EditInscripcionComponent implements OnInit {

  fcreate: FormGroup;
  error_message: string = "";
  constructor(private fb: FormBuilder, private routeractived: ActivatedRoute, private router: Router, private dp: DatePipe, private inscriptionService: InscriptionService) {
    this.fcreate = this.fb.group({
      id: ['', Validators.required],
      name: ['', [Validators.required, this.validateName]],
      age: ['', [Validators.required]],
      birthdate: ['', [Validators.required, this.validateBirthDate]],
      price: ['', [Validators.required]],
      inscription_date: ['', [Validators.required, this.validateInscriptionDate]],
      created_at: [''],
      updated_at: [''],
    }, {
      validators: [this.validateAge, this.validatePayment]
    });
  }

  ngOnInit(): void {
    this.routeractived.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id) {
        this.inscriptionService.get(Number(id)).subscribe(data => {

          if (data.success) {
            const { birthdate, inscription_date, ...others } = data.data;
            let birthdate1 = this.dp.transform(moment(birthdate).format("MM-DD-YYYY"), 'yyyy-MM-dd');
            let inscription_date1 = this.dp.transform(moment(inscription_date).format("MM-DD-YYYY"), 'yyyy-MM-dd');
            this.fcreate.setValue({ ...others, birthdate: birthdate1, inscription_date: inscription_date1 });
          }
        });
      }
    })
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
    const age1 = control.get('age');
    if (age1) {
      let age = age1.value;
      if (age) {
        if (age < 18) {
          control.get("age")?.setErrors(
            {
              minage: "El usuario debe ser mayor de 18 años"
            }
          )
        }
        let birthdate = control.get("birthdate");
        if (birthdate) {
          if (moment().diff(moment(birthdate.value), 'years') != age) {
            control.get("age")?.setErrors(
              {
                ageandbirthdateinvalid: "La edad no coincide con la fecha de nacimiento"
              }
            )
          }
        }
      }
    }


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
  private validatePayment(control: AbstractControl) {
    let inscription_date1 = control.get("inscription_date");
    let price1 = control.get("price");
    if (inscription_date1 && price1) {
      let inscription_date = inscription_date1.value;
      let price = price1.value;
      let years = moment().diff(moment(inscription_date), 'years');
      console.log(years);
      years == 0 ? years = 1 : years = years;
      let montoapagar = years * 100;
      if (montoapagar != price) {
        control.get("price")?.setErrors(
          {
            paymentinvalid: "El monto a pagar no coincide con el tiempo de inscripcion"
          }
        )
      }
    }
  }

  editInscription() {
    if (this.fcreate.valid) {
      this.inscriptionService.update(this.fcreate.value.id, this.fcreate.value).subscribe(data => {
        if (data.success) {
          this.router.navigate(['/']);
        }
      });
    } else {
      this.error_message = "Complete correctamente el fomulario para continuar";
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