'use client'
import axios from "axios"

export default function Http(){
    const url = 'http://localhost:3001'
    const payload = {
        id: 100,
        name: 'java',
        price: 1000
    }
    const doGet = async () => {
        const response = await axios.get(url)
        console.log(response.data)
    
    }
    const doPost = async () => {
        const response = await axios.post(url, payload)
        console.log(response.data)
        
    }

    const doPut = async () => {
        const response = await axios.put(url + '/100', payload)
        console.log(response.data)
        
    }

    const doDelete = async () => {
        const response = await axios.delete(url + '/100')
        console.log(response.data)
        
    }

    return(
        <div className="p-6">
            <button onClick={doGet} className="button">Get</button>
            <button onClick={doPost} className="button ms-2">Post</button>
            <button onClick={doPut} className="button ms-2">Put</button>
            <button onClick={doDelete} className="button ms-2">Delete</button>
            
        </div>
    )
            




            
}