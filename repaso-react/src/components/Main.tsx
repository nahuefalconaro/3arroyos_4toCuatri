import { useEffect, useState } from "react"
import Card from "./Card"
import './Main.css'

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  website: string
}

function Main() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    
    function getUsers() {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setUsers(data)
        })
    }

    getUsers();

    // async function getUsers() {
    //   const res = await fetch("https://jsonplaceholder.typicode.com/users");
    //   const data = await res.json();
    //   console.log(data);
    // }

    // getUsers();

  }, [])

  return (
    <main className="main">
      {(users.length > 0) && users.map(user => (
        <Card key={user.id} name={user.name} website={user.website}/>
      ))}
    </main>
  )
}

export default Main