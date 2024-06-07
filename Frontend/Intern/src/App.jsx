import React , {useEffect, useState} from 'react'
import axios from 'axios';
import Card from './Card';

const App = () => {
  let [data , setData ] = useState([])

  let getData = async()=>{
    let obj = await axios.get("http://localhost:8080/allInternship")
   
    setData(obj.data)
  }

  useEffect(() => {
    getData()
  },[])
  return (
    <div className='bg-zinc-300 w-screen min-h-screen flex justify-center '>
      <div className="w-1/2 h-1/3">
      {
        data.map((obj)=> {
          return <Card obj={obj} key={obj.id}></Card>
        })
      }
      </div>
    </div>
  )
}

export default App
