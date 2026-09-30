import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../components/publicContext/Public-Context";
import { useForm } from "react-hook-form";

function useEditProfile() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
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
        const result = await response.json();
        if (!response.ok)
          throw new Error("Произошла ошибка попробуйте ещё раз");
        const userData = result.user;
        setUser(userData);
        setValue("username", userData.username);
        setValue("email", userData.email);
        setValue("bio", userData.bio || "");
        setValue("image", userData.image || "");
      } catch (error) {
        setError(error.message);
      }
    };
    getProfile();
  }, [name, setValue, token]);

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
      setName(data.username);
      localStorage.setItem("name", data.username);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return { register, handleSubmit, user, navigate, errors, error, putProfile };
}
export default useEditProfile;
