import { useNavigate } from "react-router-dom";
import { useState } from "react";

function useSignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const post = async (users) => {
    setError("");
    try {
      const response = await fetch("https://realworld.habsida.net/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: users,
        }),
      });
      console.log(response);
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.user.token);
        navigate("/");
        return;
      }
        else if (data.errors.body[0].includes("username")){
          setError("Такое имя уже занято");
        }
        
        if (data.errors.body[0].includes("email")){
           setError("");
        setError("Такой Email уже занят");
        }
    } catch (error) {
      setError(error);
    }
  };

  return { error, setError, post };
}

export default useSignUp;
