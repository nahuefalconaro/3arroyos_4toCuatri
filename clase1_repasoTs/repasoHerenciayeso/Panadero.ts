class Panadero extends Profesion implements InterfaceMetodos{

    private pastelero: boolean;

    constructor(edad: number, nombre: string, pastelero: boolean) {
        super(edad, nombre);
        this.pastelero = pastelero;
    }


    public getNombre(): string {
        return "Panadero: " + super.getNombre();
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