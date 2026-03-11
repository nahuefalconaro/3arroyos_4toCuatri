let holaMundo: string = "Hola Mundo";
const adiosMundo: string = "Adios Mundo";
const const1: number = 12;
let arrVacio: string[] = [];
let arr: string[] = ["clase1", "clase2", "clase3"];
let arrNumber: number[] = [1, 2, 3, 4, 5];

function iniciar(): void {
    console.log(holaMundo);
    console.table(arr);
    arr.push("clase4");
    console.table(arr);
}

function terminar(): string {
    return adiosMundo;
}

iniciar();
console.log(terminar());
