import { Module } from "@nestjs/common";
import { EdificioController } from "./edificio.controller";
import { DepartamentoModule } from "src/departamento/departamento.module";
import { EdificioService } from "./edificio.service";

@Module({
    imports: [DepartamentoModule],
    controllers: [EdificioController],
    providers: [EdificioService]
})
export class EdificioModule {}