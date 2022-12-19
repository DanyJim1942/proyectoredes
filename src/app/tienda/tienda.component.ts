import { Component, OnInit } from '@angular/core';
import { DatosProducto } from '../datos-producto';
import { ServicioService } from '../servicio.service';
//import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  pages: number = 1;
  c: number = 20;
  cards: any|DatosProducto= [];

  constructor(private apiS:ServicioService) { 
    //this.cards = getCatalogo();
    //this.c = getContCatalogo();
    this.apiS.getPI().forEach((arr:any)=>{
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        console.log(element.description.substr(0,9));        
        let aux = new DatosProducto(element.title,element.price,element.description.substr(0,29),element.image)        
        this.cards[index]=aux;
      }
    });
  }

  ngOnInit(): void {
    
  }

  agregarArticulo(nomb:any,prec:any,edad:any,img:any): void {
    /*let x = parseInt(JSON.parse( localStorage.getItem("id") || '0' ),10);
    this.apiS.getIDP(x).subscribe(res1=>{
      this.apiS.getIdLiH(x).subscribe(res2=>{
        this.apiS.getNJugCarro(res1,res2).subscribe(res3=>{
          this.apiS.guardarPCarr(res1,nomb,prec,edad,img.substring(20,),res2,res3).subscribe(res4=>{
            console.log(res4);
          });
        })
      })
    })
      */
    alert("articulo agregado");
  }

  alfa(){
    this.cards.sort(this.SortAlfabetico);
    console.log(this.cards);
  }

  SortAlfabetico(x:any, y:any){
    return x.title.localeCompare(y.title);
  }

  precioA(){
    this.cards.sort(this.SortPrecioA);
    console.log(this.cards);
  }

  SortPrecioA(x:any, y:any){
    return x.price - y.price;
  }

  precioD(){
    this.cards.sort(this.SortPrecioD);
    console.log(this.cards);
  }

  SortPrecioD(x:any, y:any){
    return y.price - x.price;
  }

}
