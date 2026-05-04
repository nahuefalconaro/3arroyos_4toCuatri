import { Injectable } from "@nestjs/common";
import { DepartamentoService } from "src/departamento/departamento.service";

@Injectable()
export class EdificioService {

    constructor(private departamentoService: DepartamentoService) {
    }

    getEdificio() {
        return " This is an edificio service method";
    }
}