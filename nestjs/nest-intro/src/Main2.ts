import { OficioDTO } from "./oficio.dto";

class Main2 {

    oficio = new OficioDTO(1, "Carpintero", 30);
    oficioService = new OficioService();
    controller = new OficioController(oficioService);

}
export default Main2;