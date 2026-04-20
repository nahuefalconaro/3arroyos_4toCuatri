import Card from './Card'
// import './Main.css'

function Main() {


  return (
    <main className="contenido">

      <div className="contenedor-portadaRelieve">
        <div className="contenedor-portada">
          {/* Zócalo izquierdo */}
          <div className="socaloPortada"></div>

          <img className="portada" src="../src\logo\foto portada.png" alt="Imagen principal" className="foto-principal"/>

            {/* Zócalo derecho */}
            <div className="socaloPortada"></div>
        </div>
        <div className="relieveVerdePortada">
        </div>
      </div>
      <div className="contenidoPrincipal">
        <Card srcImage="../src/indexTarj/contacto.png" title="Contactanos" description="Dejanos tu opinion, y tu satisfaccion con el foro. Siempre nos da gusto escucharte." />

      </div>
    </main>
  )
}

export default Main