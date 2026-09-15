import { useState } from "react";
import Button from "../button/button";
import { useNavigate } from "react-router-dom";
function Profile() {
    const navigate =useNavigate()
  const token = localStorage.getItem("token");
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const hendleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const edit = (e) => {
    e.preventDefault();
    setError("");
    if (user.username.trim().length === 0) {
      alert("Имя пользователя не должно быть пустым.");
      return;
    }
    if (user.password.length < 6 || user.password.length > 40) {
      alert("Длина пароля должна составлять от 6 до 40 символов.");
      return;
    }
    const putProfile = async () => {
      try {
        const response = await fetch("https://realworld.habsida.net/api/user", {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            user: {
              username: user.username,
              email: user.email,
              password: user.password,
            },
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(
            data.errors ? JSON.stringify(data.errors) : "Произошла ошибка",
          );
        }

        localStorage.setItem("name", data.user.username)
        localStorage.setItem("token",data.user.token)
        alert("Профиль успешно обновлен!");
      } catch (error) {
        setError(error.message);
      }
    };
    
    putProfile()
    navigate("/")
    window.location.reload()
  };
  return (
    <div className="flex items-center justify-center">
      
      <form 
        className="flex flex-col items-center justify-center max-w-[500px] min-h-[538px] gap-[10px]"
      onSubmit={edit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
        className="border-1 border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="text"
          name="username"
          onChange={hendleChange}
          placeholder="Username"
          value={user.username}
        />
        <input
        className="border-1 border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="email"
          name="email"
          onChange={hendleChange}
          placeholder="Email"
          value={user.email}
        />
        <input
        className="border-1 border-[#AAAAAA] w-[480px] h-[48px] rounded-[8px] cursor-pointer pl-5 placeholder:text-[16px]  "
          type="password"
          name="password"
          onChange={hendleChange}
          placeholder="Password"
          value={user.password}
        />
        <Button type="submit" text="Edit" />
        
      </form>
     
    </div>
  );
}
export default Profile;
