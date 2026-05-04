import { Controller, Get } from "@nestjs/common";
import { DepartamentoService } from "./departamento.service";

@Controller("departamento")
export class DepartamentoController {
    
    private readonly departamentoService: DepartamentoService;

    constructor(departamentoService: DepartamentoService) {
        this.departamentoService = departamentoService;
    }

    @Get()
    getDepartamento() {
      return this.departamentoService.getDepartamento();
    }
    // Aquí puedes definir los métodos para manejar las solicitudes relacionadas con el departamento
}