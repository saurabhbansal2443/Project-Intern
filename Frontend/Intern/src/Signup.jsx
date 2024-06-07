import React ,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let [msg, setMsg] = useState(false);
  let Navigate = useNavigate();
  let [formData , setFormData] = useState({
    email : "",
    name :"",
    password : ""
  });

  let handleChange  = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
  }

  let createData = async () => {
    let obj = await axios.post("http://localhost:8080/signup",formData);

    if(obj.data.email){
      Navigate("/")
    }else{
      setMsg(true);
    }
  }

  let handleSubmit = (event) => {
    event.preventDefault();
    createData()
  }
  return (
    <div className="bg-zinc-300  h-screen w-screen flex justify-center items-center flex-col">
        <h1 className="text-3xl text-black  mb-7"> Let's Signup here </h1>
      <form className="h-1/2 w-1/3" onSubmit={handleSubmit}>
        <label className="input input-bordered flex items-center gap-2 m-3">
          <input type="text" className="grow" placeholder="Name" name="name"  value={formData.name} onChange={handleChange}  required />
        </label>

        <label className="input input-bordered flex items-center gap-2 m-3">
          <input type="text" className="grow" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label className="input input-bordered flex items-center gap-2 m-3">
          <input autoComplete="true" type="password" className="grow" placeholder="password" name="password"  value={formData.password} onChange={handleChange} required />
        </label>
        <label className="input input-bordered flex w-1/2 items-center mt-6 mx-auto gap-2">
          <input type="submit" className="grow" />
        </label>
      </form>
      {msg == true ? (
          <h1 className="text-3xl text-black"> try Again </h1>
        ) : (
          <></>
        )}
    </div>
  );
};

export default Signup;
