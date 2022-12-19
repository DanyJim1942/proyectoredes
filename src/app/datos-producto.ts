export class DatosProducto {
    image ;
    price ;
    title ;
    description ;

    constructor(nomb:any,prec:any,desc:any,img:any){
        this.description = desc;
        this.price = prec;
        this.title = nomb;
        this.image = img;
    }
}
