class Juego3 extends JuegoPadre implements Ejecutor{// HERENCIA, INTERFACE

    constructor(nombreJuego: string, puntaje: number) {
        super(nombreJuego, puntaje);
    }

    public getPuntaje(): number {
        return this.puntaje;
    }

    public puedoEjecutarlo(nombreDeJuegoDeAfuera: String): boolean {
        return this.getNombreJuego() === nombreDeJuegoDeAfuera && new Date().getMinutes() % 2 === 0; // este juego solo se puede ejecutar si el minuto actual es par
    }

    public ejecutar(): void {
        this.iniciarJuego();
        // Logica interna de este juego, para que asi tenga sentido tener juegos diferentes
        this.getPuntaje();
    }
}