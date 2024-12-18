import { User } from "../types/types";
export default async function Page() {

    const res = await fetch ("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    console.log(data);
  return (
    <div>
    <h1>cabin page</h1>
    <ul>
        {data.map((user: User)=> <li key={user.id}>{user.name}</li>)}
    </ul>
    </div>
  )
}
