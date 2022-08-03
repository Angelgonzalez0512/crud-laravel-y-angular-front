import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InscriptionService } from 'src/app/core/services/inscription.service';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss']
})
export class InscriptionsComponent implements OnInit {
  inscriptions: any[] = [];
  constructor(private router: Router,private _inscriptionService:InscriptionService) { }
  ngOnInit(): void {
    this._inscriptionService.getAll().subscribe(data=>{
      this.inscriptions=data.data;
      console.log(this.inscriptions);
    })
  }
  delete(inscription:any){
    this._inscriptionService.delete(inscription.id).subscribe(data=>{
      if(data.success){
        this.inscriptions=this.inscriptions.filter(item=>item.id!=inscription.id);
      }
    })
  }
  

}
