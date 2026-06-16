export interface Pedido{
    id?:string;
    cliente:string;
    total:number;
    estado:string;
    productos:any[];
}