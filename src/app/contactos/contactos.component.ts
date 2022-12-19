import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {

  contactForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    mensaje: new FormControl('', [Validators.required])
  })

  constructor() { }

  ngOnInit(): void {}

  onSaveForm(): void {
    console.log(this.contactForm.value);
  }

  onResetForm(): void {
    this.contactForm.reset();
  }


}
