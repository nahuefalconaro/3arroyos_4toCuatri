class Departamento {

    private habitaciones: number;
    private banos: number;
    private balcon: boolean;
    private nroDepto: number;
    private propietario: string;// mejor crear una clase persona

    constructor(habitaciones: number, banos: number, balcon: boolean, nroDepto: number, propietario: string) {
        console.log("Inicializando clase Departamento");
        this.habitaciones = habitaciones;
        this.banos = banos;
        this.balcon = balcon;
        this.nroDepto = nroDepto;
        this.propietario = propietario;
    }
}