import { useContext, useState } from "react";
import { Context } from "../components/Private-Context.jsx/Private-Context";

function useEditProfile(url) {
  const [success, setSuccess] = useState("");
  const { token, setName } = useContext(Context);
  const [error, setError] = useState("");
  const post = async (data) => {
    setError("");
    setSuccess("");
    setName("");
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Token ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ user: data }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error("Ошибка сети попробуйте позже");
      } else {
        setSuccess("Данные обновлены");
        localStorage.setItem("name",result.user.username)
        setName(localStorage.getItem("name"));
      }
    } catch (err) {
      setError(err.message);
    }
  };
  return { error, post, success };
}
export default useEditProfile;
