import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-carta-s',
  templateUrl: './carta-s.component.html',
  styleUrls: ['./carta-s.component.css']
})
export class CartaSComponent implements OnInit {

  cartaForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    mensaje: new FormControl('', [Validators.required])
  })

  elegirMenu:any;
  id:any;
  nomb:any;
  constructor(private apiS:ServicioService) {
    this.elegirMenu = parseInt(JSON.parse( localStorage.getItem("tipo") || '0' ),10);
    this.id = JSON.parse( localStorage.getItem("id") || '' );
    this.apiS.getName(this.id).then((res:any)=>{this.nomb = res});
    this.apiS.getTipo(this.id).then((res:any)=>{this.elegirMenu = res});
   }

  ngOnInit(): void {}

  onSaveForm(): void {
    console.log(this.cartaForm.value);
    this.apiS.writeCarta(this.cartaForm.value.nombre,this.cartaForm.value.mensaje,this.id)
  }

  onResetForm(): void {
    this.cartaForm.reset();
  }

}
