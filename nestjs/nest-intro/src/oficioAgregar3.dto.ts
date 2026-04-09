import { OficioDTO } from './oficio.dto';

export class OficioAgregar3DTO extends OficioDTO {
    salario: number;

    constructor(salario: number, id: number, nombre: string, edad: number) {
        super(id, nombre, edad);
        this.salario = salario;
    }
}