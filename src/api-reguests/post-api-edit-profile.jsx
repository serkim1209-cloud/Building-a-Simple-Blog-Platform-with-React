import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../components/contextRouter/ContextRouter";

function useEditProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const { name, token,setName } = useContext(Context);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(`https://realworld.habsida.net/api/user`, {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const getResult = await response.json();
        if (!response.ok)
          throw new Error("Произошла ошибка попробуйте ещё раз");
        setUser(getResult.user);
      } catch (error) {
        setError(error.message);
      }
    };
    getProfile();
  }, [name, token]);

  const putProfile = async (data) => {
    try {
      const profile = await fetch("https://realworld.habsida.net/api/user", {
        method: "PUT",
        headers: {
          Authorization: `Token ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: data.username,
            bio: data.bio,
            image: data.image,
            email: data.email,
          },
        }),
      });
      const result = await profile.json();

      if (!profile.ok) {
        throw new Error("Не удалось обновить профиль");
      }
      localStorage.setItem("name", data.username);
      if (setName) setName(data.username); 
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return { user, navigate, putProfile, error };
}
export default useEditProfile;
