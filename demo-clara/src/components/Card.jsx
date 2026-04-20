// import './Card.css'

function Card({ srcImage, title, description }) {

  return (
    <div className="card">
      <div className="contenedor">
        {/* Imagen de la tarjeta */}
        <div className="imagen">
          <img src={srcImage} />
        </div>
        <div className="contienePregunta">
          <div className="titulo">
            <h4>{title}</h4>
          </div>
          <div className="textoExplicativo">
            <p> {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card