import { useContext, useState } from "react";
import { AuthoContext } from "../../App";
import { useNavigate } from "react-router-dom";

function useLogin(url) {
  const [error, setError] = useState("");
  const { setToken } = useContext(AuthoContext);
  const navigate = useNavigate();

  const post = async (data) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          user: data,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
       throw new Error("Неверный пароль или логин");
      } else {
        localStorage.setItem("token", resData.user.token);
        localStorage.setItem("name", resData.user.username);
        setToken(localStorage.getItem("token"));
        navigate("/");
      }
    } catch (erro) {
      setError(erro.message);
    }
  };
  return {
    error,
    post,
  };
}
export default useLogin;
