import './Card.css'

interface CardProps {
  name: string,
  website: string
}


function Card({ name, website }: CardProps) {

  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{website}</p>
    </div>
  )
}

export default Card