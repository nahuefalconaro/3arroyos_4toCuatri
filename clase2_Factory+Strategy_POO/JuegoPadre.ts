abstract class JuegoPadre { // CLASE ABSTRACTA
    protected puntaje: number;
    private nombreJuego: string;

    constructor(nombreJuego: string, puntaje: number) {
        this.nombreJuego = nombreJuego;
        this.puntaje = puntaje;
    }

    public getNombreJuego(): string {
        return this.nombreJuego;
    }

    abstract getPuntaje(): number; // CLASE ABSTRACTA

    public iniciarJuego(): void {
        console.log("Iniciando juego: " + this.getNombreJuego());
    }
}