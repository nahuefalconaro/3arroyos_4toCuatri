import { IsInt, IsString, Length, Max, Min } from 'class-validator';

export class OficioDTO {
    id: number;
    
    @IsString({
        message: "El nombre tiene que tener entre 3 y 50 caracteres"
    })
    @Length(3, 50)//min, max
    nombre: string;
    
    @IsInt({
        message: "La edad debe ser un número entero"
    })
    @Min(18, {
        message: "La edad debe ser mayor o igual a 18"
    })
    @Max(80, {
        message: "La edad debe ser menor o igual a 80"
    })
    edad: number;

    constructor(id: number, nombre: string, edad: number) {
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
    }
}