import { useState } from "react"

function AddUser() {
  const [name, setName] = useState("")
  const [age, setAge] = useState(0)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newUser = {
      name,
      age
    }

    fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => console.log(data))
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} />
      <input type="number" placeholder="Edad" value={age} onChange={e => setAge(Number(e.target.value))} />
      <button type="submit">Agregar Usuario</button>
    </form>
  )
}

export default AddUser