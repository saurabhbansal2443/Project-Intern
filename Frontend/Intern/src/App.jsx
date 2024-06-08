import React , {useEffect, useState} from 'react'
import axios from 'axios';
import Card from './Card';
import { Link } from 'react-router-dom';

const App = () => {
  let [data , setData ] = useState([])
  let [isLogged , setisLogged ] = useState(localStorage.getItem("Token")!="null"?localStorage.getItem("Token") : null)

  let getData = async()=>{
    let obj = await axios.get("http://localhost:8080/allInternship")
   
    setData(obj.data)
  }

  useEffect(() => {
    getData()
  },[])


  return (
    <div className='bg-zinc-300 w-screen min-h-screen flex justify-center  flex-col items-center'>
      <div className="utility flex  w-screen justify-end pr-4">
        {
          isLogged ?<button className='btn btn-primary m-2 ' onClick={()=> {localStorage.setItem("Token" , null) ;  setisLogged(null)}}> Logout </button>: <Link to="/login"><button className='btn btn-primary m-2 '> Login </button></Link>
        }
       
        <Link to="/signup"><button className='btn btn-primary m-2 '> SignUp </button></Link>
      </div>
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
