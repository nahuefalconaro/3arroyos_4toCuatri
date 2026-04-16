import { Injectable } from "@nestjs/common";


// controller -> service -> repository -> database
// 1- recibo consulta al endpoint(metodo controller)
// 2- El metodo del controller llama al metodo del service
// 3- El metodo del service hace la logica de negocio que necesite

// @Injectable()//esta clase puede ser inyectada en otras clases. Ej: En controladores
// es para no instanciar la clase que la usa con new y pasarle esta clase
export class OficioService {




}