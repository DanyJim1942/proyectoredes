import { Component, OnInit } from '@angular/core';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getAuth } from '@firebase/auth';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  elegirMenu : any;
  verdadera=true;
  verdadera2=true;
  correo = "";
  contra = "";
  id:any;
  nomb:any;
  
  loginForm = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    contrasena: new FormControl('', [Validators.required])
  })

  loginTelefonoForm = new FormGroup({
    numero: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")])
  })

  registroForm = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    username: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z]+$")]),
    contrasena: new FormControl('', [Validators.required]),
    confirmarContrasena: new FormControl('', [Validators.required])
  })

  constructor(private apiS:ServicioService) {
    this.elegirMenu = parseInt(JSON.parse( localStorage.getItem("tipo") || '0' ),10);
    //this.id = JSON.parse( localStorage.getItem("id") || '' );
    this.apiS.getName(this.id).then((res:any)=>{this.nomb = res});
    this.apiS.getTipo(this.id).then((res:any)=>{this.elegirMenu = res});
   }

  ngOnInit(): void {
  }

  cerrarSesion(): void{
    const auth = getAuth();
    signOut(auth).then(() => {
      localStorage.setItem('id', "")
      localStorage.setItem('tipo', "0")
      this.id = "";
      this.elegirMenu = 0;
    }).catch((error) => {
      // An error happened.
    })
  
  }

  onLoginForm(): void {
    alert("Registra al usuario...");

    if (this.loginForm.dirty && this.loginForm.valid) {
      alert(`Correo: ${this.loginForm.value.correo}`);
      alert(`Contraseña: ${this.loginForm.value.contrasena}`);
    }

  }

  loginConGoogle(): void {
    alert("Login con Google...");
  }

  loginConTelefono(): void {
    alert("Login con Telefono...");
  }

  onRegisterForm(): void {

    alert("Registra al usuario...");

    if (this.loginForm.dirty && this.loginForm.valid) {
      alert(`Correo: ${this.loginForm.value.correo}`);
      alert(`Contraseña: ${this.loginForm.value.contrasena}`);
    }


  }

  registrarP(){
    const auth = getAuth();
    if(this.registroForm.value.correo != null && null != this.registroForm.value.contrasena){
      createUserWithEmailAndPassword(auth, this.registroForm.value.correo, this.registroForm.value.contrasena)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.uid);
        this.id = user.uid;
        this.elegirMenu = 1;
        this.apiS.getName(this.id).then((res:any)=>{this.nomb = res});
        this.apiS.getTipo(this.id).then((res:any)=>{this.elegirMenu = res});
        localStorage.setItem('id', JSON.stringify(this.id));
        localStorage.setItem('tipo', JSON.stringify(this.elegirMenu));
        this.apiS.writeUserDatos(this.id,this.registroForm.value.username,1,"");
        this.registroForm.reset();
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    }
  }

  logU(){
    let auth = getAuth();
    if(this.loginForm.value.correo != null && this.loginForm.value.contrasena != null ){
      signInWithEmailAndPassword(auth, this.loginForm.value.correo , this.loginForm.value.contrasena)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user.uid);
          this.id = user.uid;
          this.apiS.getName(this.id).then((res:any)=>{this.nomb = res}); 
          this.apiS.getTipo(this.id).then((res:any)=>{
            this.elegirMenu = res;
            localStorage.setItem('tipo', JSON.stringify(this.elegirMenu));  
          });
          localStorage.setItem('id', JSON.stringify(this.id));     
          this.loginForm.reset();
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
      }
  }

  registrarH(){

    let auth = getAuth();
    if(this.loginForm.value.correo != null && this.loginForm.value.contrasena != null ){
      signInWithEmailAndPassword(auth, this.loginForm.value.correo , this.loginForm.value.contrasena)
        .then((userCredentialP) => {
          // Signed in
          const userp = userCredentialP.user;
          console.log(userp.uid);
          if(this.registroForm.value.correo != null && null != this.registroForm.value.contrasena){
            createUserWithEmailAndPassword(auth, this.registroForm.value.correo, this.registroForm.value.contrasena)
            .then((userCredentialH) => {
              // Signed in
              const userh = userCredentialH.user;
              console.log(userh.uid);
              this.id = userh.uid;
              this.elegirMenu = 2;
              localStorage.setItem('id', JSON.stringify(this.id));
              localStorage.setItem('tipo', JSON.stringify(this.elegirMenu));
              this.apiS.writeUserDatos(this.id,this.registroForm.value.username,2,userp.uid);
              this.apiS.getName(this.id).then((res:any)=>{this.nomb = res}); 
              this.registroForm.reset();
              this.loginForm.reset();
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ..
            });
          }
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
      }
    /*this.apiS.logU(this.loginForm.value.correo,this.loginForm.value.contrasena).subscribe( (res1: any) => {
      console.log(res1);
      
      this.apiS.getNumHij(res1).subscribe((res2:any)=>{
        
        this.apiS.registroHijoTot(res1,this.registroForm.value.correo,this.registroForm.value.contrasena,this.registroForm.value.username,res2).subscribe((res2: any) => {
          console.log(res2.uid);
          this.id = res2.uid;
          localStorage.setItem('id', JSON.stringify(this.id));
          this.elegirMenu = 2;
          localStorage.setItem('tipo', JSON.stringify(this.elegirMenu));
          this.registroForm.reset();
          this.loginForm.reset();
        });
      });
    });*/
    
  }

  funcionverdadero(): void{
    this.verdadera=true;
  }
  funcionfalso(): void{
    this.verdadera=false;

  }
  funcionverdadera2(): void{
    this.verdadera2=false;
  }

  prueba(){
    this.apiS.writeUserDatos("UtMBIgNbc0YAKl3WaJJbR4Dqjjc2","",2,"")
  }

}
