import './Card.css'

interface CardProps {
  name: string,
  age: number
}


function Card({ name, age }: CardProps) {

  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{age}</p>
    </div>
  )
}

export default Card