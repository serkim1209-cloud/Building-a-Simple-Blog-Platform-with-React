import { useContext, useState } from "react";
import { AuthoContext } from "../../App";

function useEditProfile(url) {
  const [success, setSuccess] = useState("");
  const { token } = useContext(AuthoContext);
  const [error, setError] = useState("");
  const post = async (data) => {
    setError("")
    setSuccess("")
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Authorization": `Token ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({user:data}),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error("Ошибка сети попробуйте позже");
      } else {
        setSuccess("Данные обновлены");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  return { error, post, success };
}
export default useEditProfile;