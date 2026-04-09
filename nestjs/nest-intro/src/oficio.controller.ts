import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { OficioDTO } from "./oficio.dto";
import { OficioAgregar3DTO } from "./oficioAgregar3.dto";

// useEffect(() => {
//     fetch('http://localhost:3000/oficios',{
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ nombre: 'Juan', edad: 30 }),
//     })
//     .then(response => response.json())
//     .then(data =>console.log(data))
//     .catch(error => console.error(error));
// }, []);


// Cuando usar param o query
// La regla general: 
// si sacás el valor y la URL deja de tener sentido → @Param. 
// Si lo sacás y la URL sigue funcionando (solo devuelve más datos o sin filtro) → @Query.


// http://localhost:3000

// http://localhost:3000/oficios-> La consulta viene con verbo GET

// GET: obtener
// POST: agregar
// PUT: modificar
// DELETE: eliminar

// Desde el front hago un get para obtener los oficios POST http://localhost:3000/oficios
@Controller('oficios')//http://localhost:3000/oficios
export class OficioController {

    @Get('obtenerOficiosMetodo')// http://localhost:3000/oficios/obtenerOficiosMetodo
    getOficios(): String {
        return "Lista oficios";
    }

    @Get()// http://localhost:3000/oficios?cantidad=10
    getOficiosDefault(@Query('cantidad') cantidad: string): String {
        return "Lista oficios";
    }

    // GET http://localhost:3000/oficios/1 esto nos mandan del front
    @Get(':id')//http://localhost:3000/oficios/:id definir esto, indica que id es variable
    getOficioPorID(@Param() id: string): String {
       return "Oficio por ID";
    }


    @Get('busqueda')// http://localhost:3000/oficios/busqueda?nombre=panadero&edad=30
    getByQueries(@Query() nombre: string,@Query() edad: string): String {
       return "Oficio por ID";
    }

    @Get('/:nombre/:edad') // http://localhost:3000/oficios/panadero/30
    getByParams(@Param() nombre: string,@Param() edad: string): String {
       return "Oficio por ID";
    }


  // GET http://localhost:3000/oficios/algo/123 esto nos mandan del front
    @Get('algo/:id')//http://localhost:3000/oficios/algo/:id definir esto, indica que id es variable
    getOficioPorAlgoID(@Param() id: string): String {
       return "Oficio por ID";
    }
    // GET http://localhost:3000/oficios/nombreOficio?nombre=panadero
    @Get('nombreOficio')
    getPorQuery(@Query('nombre') nombre: string): String {
        return "Oficio por query: " + nombre;
    }


/*
{
id: 1,
nombre: "panadero",
edad: 30
}
*/  


    @Post()// http://localhost:3000/oficios
    postOficios(@Body() oficio: OficioDTO): String {
        return "Agregando oficio" + oficio.nombre;
    }

    @Post('agregar')// http://localhost:3000/oficios/agregar
    postOficios2(@Body() oficio: OficioDTO): String {
        return "Agregando oficio";
    }

    @Post('agregar3')// http://localhost:3000/oficios/agregar3
    postOficios3(@Body() oficio: OficioAgregar3DTO): String {
        return "Agregando oficio" + oficio.salario;
    }

    @Delete(':id')// http://localhost:3000/oficios/:id
    deleteOficio(@Param('id') id: string): String {
        return "Eliminando oficio con ID: " + id;
    }

    @Put(':id')// http://localhost:3000/oficios/:id
    updateOficio(@Param('id') id: string, @Body() oficio: OficioDTO): String {
        return "Modificando oficio con ID: " + id;
    }
}