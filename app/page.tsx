'use client'

import { useState} from "react";
import Image from "next/image";


export default function Home() {
  const [books, setBooks] = useState([
    {id: 100, name:'java'},
    {id: 101, name:'python'},
    {id: 102, name:'javascript'},
    {id: 103, name:'c++'},
    {id: 104, name:'react'},
    
    
  ]);
 

  return (
    <div className="p-4">
      <button className="button">My Button</button>
      <Image src='/next.svg' width={200} height={200} alt="Vercel Logo" className="mb-3"></Image>
      {books.map(item => (
        <div key={item.id}>{item.id}: {item.name}</div>
      ))}
    </div>
  );
}
