class Edificio {
    
    // protected / private / public
    private nombre: string;
    private pisos: Map<string, Departamento[]>;

    constructor(nombre: string) {
        console.log("Inicializando clase Edificio");
        this.nombre = nombre;
        this.pisos = new Map<string, Departamento[]>();
    }
    public getNombre(): string {
        return this.nombre;
    }

    public addDepartamento(piso: string, departamento: Departamento): void {
        this.pisos.set(piso, [departamento]);
    }

}