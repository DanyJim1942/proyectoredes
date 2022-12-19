import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { set,ref,get,child } from '@firebase/database';
import { getAuth,signInWithEmailAndPassword } from '@firebase/auth';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue } from '@angular/fire/database';
import { Auth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  
  db:any;
  constructor(public http: HttpClient, private auth: Auth) {
   }

  logU(corr:any,cont:any):any|JSON{
    signInWithEmailAndPassword(this.auth,corr,cont).then((userCredential) => {
      // Signed in
      
      const user = userCredential.user;
      console.log(user.uid);
      
      return {ext:true,uid:user.uid};
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      
      return {ext:false,mnsj:errorMessage};
    });
  }

  getPI(){
    return this.http.get("https://fakestoreapi.com/products/");
  }
  
  writeUserDatos(userId:any, name:any, tipo:any,idp:any):any{
    const db = getDatabase();
    if(tipo == 1){
      set(ref(db, "usuarios/"+userId + '/'), {
        Nombre: name,
        Tipo: tipo,
        C: 0,
        nC: 0
      });
      return {ext:true}
    }else if(tipo == 2){
      get(child(ref(getDatabase()), `usuarios/${idp}/C`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const data = snapshot.val();
          var x = data;
          set(ref(db, "usuarios/"+ idp + '/hijos/' + x), userId);
          x++;
          set(ref(db, "usuarios/"+ idp + '/C'), x);
          set(ref(db, "usuarios/"+userId + '/'), {
            Nombre: name,
            Tipo: tipo,
            IdP: idp
      
          });
          return {ext:true}
        } else {
          return {ext:false}
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
        return {ext:false}
      });
    }
  }

  writeCarta(nomb:any,mnsj:any,id:any):any{
    const db = getDatabase();
    return get(child(ref(getDatabase()), `usuarios/${id}/IdP`)).then((s1):any => {
      if (s1.exists()) {
        const idp = s1.val();
        get(child(ref(getDatabase()), `usuarios/${idp}/nC`)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            const data = snapshot.val();
            var x = data;
            set(ref(db, "usuarios/"+ idp + '/cartas/' + x), {
              Nombre: nomb,
              Carta: mnsj
            });
            x++;
            set(ref(db, "usuarios/"+ idp + '/nC'), x);
            return {ext:true}
          } else {
            return {ext:false}
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
          return {ext:false}
        });
      } else {
        return {ext:false}
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
      return {ext:false}
    });
  }

  getCarta(id:any,i:any):any{
    return get(child(ref(getDatabase()), `usuarios/${id}/cartas/${i}/Nombre`)).then((snapshot1) => {
      console.log(snapshot1.val());      
      return get(child(ref(getDatabase()), `usuarios/${id}/cartas/${i}/Carta`)).then((snapshot2) => {
        console.log(snapshot2.val());      
        return {Nombre:snapshot1.val(),Carta:snapshot2.val()};
      }).catch((error) => {
        console.error(error);
        return 0;
      });
    }).catch((error) => {
      console.error(error);
      return 0;
    });
  }

  getNC(id:any):any{
    return get(child(ref(getDatabase()), `usuarios/${id}/nC`)).then((snapshot) => {
      console.log(snapshot.val());      
      return snapshot.val();
    }).catch((error) => {
      console.error(error);
      return 0;
    });
  }

  getC(id:any):any{
    return get(child(ref(getDatabase()), `usuarios/${id}/C`)).then((snapshot) => {
      console.log(snapshot.val());      
      return snapshot.val();
    }).catch((error) => {
      console.error(error);
      return 0;
    });
  }

  getHijo(idp:any, id:any){
    return get(child(ref(getDatabase()), `usuarios/${idp}/hijos/${id}`)).then((snapshot) => {
      console.log(snapshot.val());      
      return snapshot.val();
    }).catch((error) => {
      console.error(error);
      return "";
    });
  }
  
  getName(id:any):any{
    return get(child(ref(getDatabase()), `usuarios/${id}/Nombre`)).then((snapshot) => {
      console.log(snapshot.val());      
      return snapshot.val();
    }).catch((error) => {
      console.error(error);
      return "";
    });
  }

  getTipo(id:any):any{
    return get(child(ref(getDatabase()), `usuarios/${id}/Tipo`)).then((snapshot) => {
      return snapshot.val()
    }).catch((error) => {
      console.error(error);
      return 0
    });
  }
    
}
