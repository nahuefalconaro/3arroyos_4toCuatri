class Programador extends Profesion implements InterfaceMetodos{

    constructor(edad: number, nombre: string) {
        super(edad, nombre);
    }
   //Metodos de interface
    public mostrarEdad(): void {
        console.log("Edad: " + super.getEdad());
    }

    public mostrarNombre(): void {
        console.log("Nombre: " + super.getNombre());
    }
    public calcularSueldo(): number {
        return 0;
    }
}