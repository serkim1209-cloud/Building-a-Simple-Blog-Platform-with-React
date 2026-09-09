import { useState } from "react"


function SigIn(){
const[sign,setSign]=useState({
    username:"",
    password:"",
})
const hendleChange =(e)=>{
    const{name,value} = e.target
    setSign({...sign,[name]:value})
}
const handleSubmit=(e)=>{
    e.preventDefault()

}
    return(
            <div className="flex items-center justify-center">
      <form
        className="flex flex-col items-center justify-center max-w-[500px] min-h-[538px] gap-[10px]"
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className="font-bold text-[46px] ">Sign Up</h1>
        </div>

        <input
          className="border-1 border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="text"
          name="username"
          value={sign.username}
          onChange={hendleChange}
          placeholder="Username"
        />

        <input
          className="border-1 border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="password"
          name="password"
          value={sign.password}
          onChange={hendleChange}
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
    )
}
export default SigIn;