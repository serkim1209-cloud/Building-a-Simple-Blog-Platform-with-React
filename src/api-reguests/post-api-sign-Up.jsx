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

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.user.token);

        navigate("/");
      } else {
      
        if (data.errors.body[0].includes("username"))
          setError("username", { message: "Такое имя уже занято" });
        if (data.errors.body[0].includes("email"))
          setError("email", { message: "Такой Email уже занят" });
      }
    } catch (err) {
      setError("username", { message: err.message || "ошибка сервера" });
    }
  };

  return { error, setError, post };
}

export default useSignUp;
