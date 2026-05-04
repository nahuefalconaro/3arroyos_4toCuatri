import { Controller, Get } from "@nestjs/common";

@Controller("edificio")
export class EdificioController {
    @Get()
    getEdificio() {
      return "This is an edificio controller method";
    }
}