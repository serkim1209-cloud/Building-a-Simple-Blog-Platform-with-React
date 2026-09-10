import { useState } from "react";
import { useNavigate } from "react-router-dom";
function SigIn() {
  const navigate = useNavigate()
  const[error,setError]=useState("")
  const[dataForm,setDataForm]=useState({
    email:"",
    password:"",
  })
  const hendlChange=(e)=>{
    const{name,value}=e.target
    setDataForm({...dataForm,[name]:value})
  }
  const submit = (e)=>{
    e.preventDefault()
    setError("")
    const SigIn = async()=>{
   try{
   const response = await fetch("https://realworld.habsida.net/api/users/login",{
    method:"POST",
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify({
      user:{
        email:dataForm.email,
        password:dataForm.password
      }
    })
   });
   
   const data =await response.json()
   if(response.ok){
  localStorage.setItem("vision",true)
  localStorage.setItem("token",data.user.token)
  localStorage.setItem("name",data.user.username)
  navigate("/")
   }
   else{
    localStorage.setItem("vision",false)
    setError("Неверный пароль или логин")
   }
 
   }catch(error){
  setError(error.message)
   }
    }
    SigIn();
  }

  
    
  
  return (
    <div className="flex items-center justify-center">
      <form
        className="flex flex-col items-center justify-center max-w-[500px] min-h-[538px] gap-[10px]"
        onSubmit={submit}
      >
        <div>
          <h1 className="font-bold text-[46px] ">Sign Up</h1>
        </div>
        {error && <h1>Неправильный пароль или логин</h1>}
        <input
          className="border-1 border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="text"
          name="email"
          value={dataForm.email}
          onChange={hendlChange}
          placeholder="Email"
        />

        <input
          className="border-1 border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="password"
          name="password"
          value={dataForm.password}
          onChange={hendlChange}
          placeholder="Password"
        />

        <div className="flex justify-end w-[480px] h-[48px]">
          <button
            className="flex items-center justify-center w-[120px] h-[43px] bg-[#61BB61] rounded-[8px] text-[#FFFFFF] "
            type="submit"
          >
            Sig In
          </button>
        </div>
      </form>
    </div>
  );
}
export default SigIn;
