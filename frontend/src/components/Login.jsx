import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Logo from "./shared/Logo";
import { toast } from "sonner";
import axios from "axios";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput({...input,[e.target.name]:e.target.value});
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/user/login",input,{
          headers:{
            'Content-Type':'application/json'
          },
          withCredentials:true,
      });
      console.log(res);
      if(res.data.success){
        toast.success(res.data.message);
        navigate("/");
      }

    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <form onSubmit={submitHandler} className="w-96 p-10 shadow-lg">
        <div className="w-full flex justify-center mb-5">
          <Logo />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" name="email" value={input.email} onChange={changeHandler}/>
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" name="password" value={input.password} onChange={changeHandler}/>
        </div>
        <Button className="w-full cursor-pointer my-5">Login</Button>
        <p className="text-sm text-center">
          Don't have an account?
          <Link to="/signup" className="text-blue-600">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

