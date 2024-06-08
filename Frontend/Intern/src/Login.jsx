import React, { useState } from "react";
import { useNavigate , Link } from 'react-router-dom';
import axios from "axios"

const Login = () => {
  let [msg, setMsg] = useState(false);
  let [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  let handleOnChange = (e) => {
    // console.log(e.target.name , e.target.value )
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  let validateUser = async () => {
    let obj = await axios.post("http://localhost:8080/login", formData);
    console.log(obj.data);
    if (obj.data.res == true) {
      localStorage.setItem("Token", obj.data.Token)
      navigate('/');
    }
    else {
      setMsg(obj.data.msg);
    }
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    setMsg(false);
    validateUser();
  };
  return (
    <div>
      <div className="bg-zinc-300  h-screen w-screen flex justify-center items-center flex-col">
        <h1 className="text-3xl text-black  "> Login Here </h1>

        <form className="h-1/2 w-1/3" onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 m-3">
            <input
              type="text"
              className="grow text-white"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 m-3">
            <input
              autoComplete="true"
              type="password"
              className="grow text-white"
              placeholder="password"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
            />
          </label>
          <label className="input input-bordered flex w-1/2 items-center mt-6 mx-auto gap-2">
            <input type="submit" className="grow" />
          </label>
        </form>

        <Link to="/signup"><button className=" bg-black text-white p-4 "> SignUp </button></Link>
        {msg ? (
          <h1 className="text-3xl text-black"> {msg} </h1>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Login;
