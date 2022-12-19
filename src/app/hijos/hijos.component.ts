import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-hijos',
  templateUrl: './hijos.component.html',
  styleUrls: ['./hijos.component.css']
})
export class HijosComponent implements OnInit {

  headers = ["Nombre"];
  c : any;
  nc : any;
  hijos = [{Nombre:""}];
  cartas = [{Nombre:"",Carta:""}]

  id:any;

  constructor(private apiS:ServicioService) { 
    this.id = JSON.parse( localStorage.getItem("id") || '' );
    this.apiS.getC(this.id).then((res:any)=>{
      this.c = res;
      for (let index = 0; index < this.c; index++) {
        this.apiS.getHijo(this.id,index).then((res:any)=>{ 
          this.apiS.getName(res).then((nomb:any)=>{this.hijos[index] = {Nombre: nomb}});
        });        
      }
    });
    this.apiS.getNC(this.id).then((res:any)=>{
      this.nc = res;
      console.log(this.nc);
      for (let index = 0; index < this.nc; index++) {
        this.apiS.getCarta(this.id,index).then((res:any)=>{ 
          console.log(res);          
          this.cartas[index] = res
        });        
      }
    })
  }

  ngOnInit(): void {
  }

}
