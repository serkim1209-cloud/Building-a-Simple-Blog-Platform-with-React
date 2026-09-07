import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    repeatpassword: "",
  });
  const navigate = useNavigate();
  const hendleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    localStorage.setItem("username", value);
  
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    navigate("/");
  };

  return (
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
          value={data.username}
          onChange={hendleChange}
          placeholder="Username"
        />
        <input
          className="border-1 border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="email"
          name="email"
          value={data.email}
          onChange={hendleChange}
          placeholder="Email address"
        />
        <input
          className="border-1 border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="password"
          name="password"
          value={data.password}
          onChange={hendleChange}
          placeholder="Password"
        />
        <input
          className="border-1 border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="Password"
          name="repeatpassword"
          value={data.repeatpassword}
          onChange={hendleChange}
          placeholder="Repeat password"
        />
        <div className="flex justify-end w-[480px] h-[48px]">
          <button
            className="flex items-center justify-center w-[120px] h-[43px] bg-[#61BB61] rounded-[8px] text-[#FFFFFF] "
            type="submit"
            onClick={() => setButtonVision(false)}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
export default LoginForm;
