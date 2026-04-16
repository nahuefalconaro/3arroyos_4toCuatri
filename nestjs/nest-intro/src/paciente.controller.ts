import { Controller } from "@nestjs/common";
import { OficioService } from "./oficio.service";


// http://localhost:3000/paciente

@Controller('paciente')
export class PacienteController { 
    
    constructor(oficioService: OficioService) {
        
    }
}