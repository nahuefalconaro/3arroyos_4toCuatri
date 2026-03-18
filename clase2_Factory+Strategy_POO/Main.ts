class Main {
    // EJEMPLO PATRON FACTORY + STRATEGY

    private ejecutor: Ejecutor[];//POLIMORFISMO

    constructor(ejecutor: Ejecutor[]) {//POLIMORFISMO
        this.ejecutor = ejecutor;
    }

    public ejecutarJuego(nombreDeJuegoDeAfuera: String): void {
        this.ejecutor.forEach(juego => {//POLIMORFISMO
            if (juego.puedoEjecutarlo(nombreDeJuegoDeAfuera)) {
                juego.ejecutar();
            }
        })
    }
}