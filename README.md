// Typescript
# Typescript

- Tipos
- Funciones
- POO (Herencia, interface, clase abstracta, polimorfismo)


1. Tipos:

#### Number
Todos los numeros ya sea enteros y con decimales

En otro lenguaje se van a encontrar que no hay un number que agrupa todo, si no que es mas en detalle: Integer, Float, Double, BigDecimal

#### String
Cadena de caracteres, es un objeto. Es un texto, y contiene funciones de arreglo.

private cadena: String;
private numero: Number;
private lista: String[];

2. Funciones:

Typescript: 
function nombre(...parametros:Tipo): <Tipo de retorno>{}

Otros lenguajes:
function <Tipo de retorno> nombre(Tipo nombreParametro){}


3. POO

#### Herencia

La herencia consiste en una clase padre que contiene atributos y metodos los cuales les hereda a las clases hijas. Estas clases hijas no necesitan redefinir si es que no modifican nada de estos metodos.
La herencia se ve reflejada en las clases hijas con la palabra reservada EXTENDS.
Y las clases hijas sobre escriben/ redefinen metodos que heredan de la clase padre con la anotacion @Override por encima del metodo

class Padre {

    private atributo1: String;

    public ejecutar(): String{
        return "Ejecutando" + modificador();
    }

    private modificador(): String{
        return atributo1 + "!!";
    }

    public getAtributo1(): String{
        return atributo1;
    }
}

class Hija extends Padre {

    constructor(){
        super();
    }

    public ejecutarClasePadre(){
        super.ejecutar()
    } 

    @Override
    public getAtributo1(): String {
        return super.getAtributo1() + "hijaAdd";
    }
}
#### Interface

Define un contrato de metodos, todo aquel que implemente la interface, debera definir cada metodo que contiene el contrato.
Cada clase tiene sus metodos propios y atributos, pero se implementa la interface esta obligada a implementar los metodos que vengan en el contrato.


interface MetodosComunesAuto {
    obtenerCantPuertas();
    obtenerVelocidad();
}

class Ferrari implements MetodosComunesAuto {
    private ventaEnARG: boolean;

    public obtenerCantPuertas(): Number{}

    public obtenerVelocidad(): Number{}

    public andar(){}
}

class Porsche implements MetodosComunesAuto {
    private precio: number;

    public obtenerCantPuertas(): Number{}
    public obtenerVelocidad(): Number{}
    public getPrecio(){}
}

ejemplo: Interface Jugar es un contrato de metodos que cada juego debe implementar obligatoriamente

Juego1 implementa Jugar
Juego2 implementa Jugar


#### Abstracta

Es una clase que define metodos como contrato como si fuese una interface, pero tambien puede tener metodos con logica propia y atributos propios como una clase comun.

abstract class Profesion {
    private antiguedad: number;
    private salario: number;

    abstract ejecutarTarea();
    abstract recopilarDatos();

    public getAntiguedad(): number{}
}

 La clase panadero tiene que implementar si o si los metodos definidos como abstractos en la clase padre Profesion.
class Panadero extends Profesion {
    constructor(){super()}

    public ejecutarTarea(){

    }

    public recopilarDatos(){

    }
}

Ejemplo: 

Jugar tiene los metodos definidos como abstract para todos los juegos que se vayan a crear, pero tiene algunos metodos propios que son comunes para todos y no se redefinen.

#### Polimorfismo

Consiste en trabajar con varias clases como si fuera la misma.

Ejemplo: Tienen una clase padre profesion, y 10 profesiones diferentes que extienden de la clase profesion.

private profesiones: Profesion[];-> polimorfismo

public imprimirProfesion(){
    profesiones.foreach(p-> {
        p.mostrarProfesion()// vamos a iterar el arreglo y veremos [Panadero, Programador]
    })
}

class abstract Profesion {
    private antiguedad: number;
    private salario: number;

    abstract mostrarProfesion();

}

class Panadero extends Profesion {
    constructor(){super()}

    public mostrarProfesion(){
            return "Panadero";
    }
}

class Programador extends Profesion {
    constructor(){super()}

    public mostrarProfesion(){
            return "Programador";
    }
}
#### Factory + strategy

Carpeta en proyecto

# Frontend
### React

// fetch().then().then().catch() es una forma de hacer peticiones HTTP en JavaScript utilizando promesas. Es una alternativa a otras bibliotecas como Axios o jQuery para realizar solicitudes a servidores y manejar las respuestas de manera asíncrona.
// fetch trae datos, el primer then trabaja con los datos del fetch, una vez que termina, el fetch siguiente trabaja con los datos del then anterior.


useEffect(() => {// hook que se ejecuta al montar el componente

    fetch('https://rickandmortyapi.com/api/character',{
      method: 'GET'//verbo de la peticion - GET, POST, DELETE, PUT
    })// hace llamada a la url dentro
    .then(response => response.json())// convierte lo que recibe de la llamda a esa url y lo transforma en json
    .then(data =>console.log(data))// imprime en consola la respuesta de arriba)// imprime en consola la respuesta de arriba
    .catch(error => console.error(error));// si hay error en cualquier linea de arriba, imprime el error

}, []);


# Backend
## NestJS
- Controlador: Presentador de endpoints. Cara visible de nuestro backend.
- Servicio: Logica de negocio, todos los metodos, ifs, demas cosas.
- Repositorio: Encargado de obtener informacion de la BD

### Documentacion

https://docs.nestjs.com/first-steps

Instalacion de nestjs:
npm install -g @nestjs/cli

Creacion de proyecto con nestjs:
nest new <NombreProyecto>-> nos va a pedir seleccionar package manager, elegir NPM.


#### Archivos

Main: Vamos a tener un unico main por aplicacion. Punto de arranque de la aplicacion. Donde se agrega la configuracion.