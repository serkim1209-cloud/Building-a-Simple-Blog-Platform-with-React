import { useContext, useState } from "react";
import { Context } from "../components/publicContext/Public-Context";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const [error, setError] = useState("");
  const { setToken, setName } = useContext(Context);
  const navigate = useNavigate();

  const post = async (data) => {
    try {
      const response = await fetch( "https://realworld.habsida.net/api/users/login", {
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
        setName(localStorage.getItem("name"));
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
