import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function useSignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm();

  const post = async (users) => {
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

        localStorage.setItem("vision", "true");
        navigate("/");
      } else {
        localStorage.setItem("vision", "false");

        if (data.errors.body[0].includes("username"))
          setError("username", { message: "Такое имя уже занято" });
        if (data.errors.body[0].includes("email"))
          setError("email", { message: "Такой Email уже занят" });
      }
    } catch (err) {
      setError("username", { message: err.message || "ошибка сервера" });
    }
  };

  return { register, errors, setError, handleSubmit, post, watch };
}

export default useSignUp;
