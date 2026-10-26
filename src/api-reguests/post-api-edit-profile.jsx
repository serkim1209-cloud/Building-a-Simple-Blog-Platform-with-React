import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../components/contextRouter/ContextRouter";

function useEditProfile() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const { name, token, setName } = useContext(Context);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(`https://realworld.habsida.net/api/user`, {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        if (!response.ok)
          throw new Error("Произошла ошибка попробуйте ещё раз");
        const getResult = await response.json();
        localStorage.setItem("user", JSON.stringify(getResult.user));
        setUser(getResult.user);
      } catch (error) {
        setError(error.message);
      }
    };
    getProfile();
  }, [name, token]);

  const putProfile = async (data) => {
    try {
      const userUpdate = {
        username: data.username,
        email: data.email,
        bio: data.bio,
        image: data.image,
      };
      if (data.password && data.password.trim() !== "")
        userUpdate.password = data.password;
      const profile = await fetch("https://realworld.habsida.net/api/user", {
        method: "PUT",
        headers: {
          Authorization: `Token ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          user: userUpdate,
        }),
      });

      if (!profile.ok) {
        throw new Error("Не удалось обновить профиль");
      }
      const result = await profile.json();
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("name", data.username);
      if (setName) setName(data.username);
      setIsModalOpen(true);
    } catch (error) {
      setError(error.message);
    }
  };
  return { user, navigate, putProfile, error, isModalOpen, setIsModalOpen };
}
export default useEditProfile;
