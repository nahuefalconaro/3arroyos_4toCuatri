import { Injectable } from "@nestjs/common";

@Injectable()
export class DepartamentoService {
    getDepartamento() {
        return "This is a departamento service method";
    }
}