class Profesion{

    private edad: number;
    private nombre: string;

    constructor(edad: number, nombre: string) {
        this.edad = edad;
        this.nombre = nombre;
    }
    
    public getEdad(): number {
        return this.edad;
    }

    public getNombre(): string {
        return this.nombre;
    }

}