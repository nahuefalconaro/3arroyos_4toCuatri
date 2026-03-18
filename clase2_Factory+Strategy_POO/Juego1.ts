class Juego1 extends JuegoPadre implements Ejecutor{// HERENCIA, INTERFACE

    constructor(nombreJuego: string, puntaje: number) {
        super(nombreJuego, puntaje);
    }

    public getPuntaje(): number {
        return this.puntaje;
    }

    public puedoEjecutarlo(nombreDeJuegoDeAfuera: String): boolean {
        return this.getNombreJuego() === nombreDeJuegoDeAfuera;
    }

    public ejecutar(): void {
        this.iniciarJuego();
        // Logica interna de este juego, para que asi tenga sentido tener juegos diferentes
        this.getPuntaje();
    }

}